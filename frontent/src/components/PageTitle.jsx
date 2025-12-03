import React, { useEffect } from 'react'

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title; // FIXED
  }, [title]);

  return null;
}

export default PageTitle;
