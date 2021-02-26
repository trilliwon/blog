import React from "react"

const Footer = () => {
  return (
    <footer className="my-12 text-center">
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
      <div>&nbsp;</div>
      <a href="https://www.trilliwon.com/rss.xml">rss</a>
    </footer>
  )
}

export default Footer
