import handleAsyncError from '../middleware/handleAsyncError.js';
import User from '../models/userModel.js';
import HandleError from '../utils/handleError.js';
import { sendToken } from '../utils/jwtToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';

// Register
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is temp id",
      url: "This is temp url"
    }
  });

  sendToken(user, 201, res);
});

// Login
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or password cannot be empty", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid Email or password", 401));
  }

  const ispasswordValid = await user.verifyPassword(password);
  if (!ispasswordValid) {
    return next(new HandleError("Invalid Email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout
export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// FORGOT PASSWORD
export const requestPasswordRest = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }

  let resetToken;
  try {
    resetToken = user.generatePasswordRestToken();
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    return next(new HandleError("Could not save reset token, please try again later", 500));
  }

  const resetPasswordURL = `http://localhost:8000/api/v1/reset/${resetToken}`;

  const message = `Use the following link to reset your password: ${resetPasswordURL}.
  \n\n This link will expire in 30 minutes. \n\n If you didn't request a password reset, please ignore this message.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message: message
    });

    res.status(200).json({
      success: true,
      message: `Email is send to ${user.email} successfully`
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new HandleError("Email couldn't be sent , please try again later", 500));
  }
});

// RESET PASSWORD
export const resetPassword = handleAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new HandleError("Reset Password token is invalid or has been expired", 400));
  }

  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new HandleError("Password doesn't match", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get user details
export const getUserDetails = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// UPDATE PASSWORD
export const updatePassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  const checkPasswordMatch = await user.verifyPassword(oldPassword);

  if (!checkPasswordMatch) {
    return next(new HandleError('Old password is incorrect', 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new HandleError("Password doesn't match", 400));
  }

  user.password = newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// UPDATE USER PROFILE
export const updateProfile = handleAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const updateUserDetails = {
    name,
    email
  };

  const user = await User.findByIdAndUpdate(
    req.user.id,
    updateUserDetails,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user
  });
});

//ADMIN-GETTING-USER-INFORMATION
export const getUserList = handleAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users
  })
})

//ADMIN-GETTING-SINGLE-USER-INFORMATION
export const getSingleUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleError(`Users doesn't exist with this id:${req.params.id}`, 400))
  }
  res.status(200).json({
    success: true,
    user
  })

})

// ADMIN CHANGING USER ROLE
export const updateUserRole = handleAsyncError(async (req, res, next) => {
  const { role } = req.body;

  const newUserData = { role };

  const user = await User.findByIdAndUpdate(
    req.params.id,
    newUserData,
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }

  res.status(200).json({
    success: true,
    user
  });
});
// ADMIN - DELETE USER PROFILE
export const deleteUser = handleAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new HandleError("User doesn't exist", 400));
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully"
  });
});


