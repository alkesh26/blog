import { FaTwitter, FaLinkedin, FaGithub, FaReddit, FaMedium } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="mb-8 mt-8 md:flex justify-between">
      <div className="text-sm text-gray-700 mb-3">© All rights reserved, 2021.</div>

      <div className="flex-col md:flex-row">
        <div className="text-sm text-gray-700">Follow me on:
          <a href="https://twitter.com/_alkesh26" target="_blank" rel="nofollow noopener noreferrer" className="pl-3 pr-3 text-gray-700"><FaTwitter /></a>
          <a href="https://www.linkedin.com/in/alkesh-ghorpade" target="_blank" rel="nofollow noopener noreferrer" className="pr-3 text-gray-700"><FaLinkedin /></a>
          <a href="https://github.com/alkesh26" target="_blank" rel="nofollow noopener noreferrer" className="pr-3 text-gray-700"><FaGithub /></a>
          <a href="https://www.reddit.com/user/alkesh26" target="_blank" rel="nofollow noopener noreferrer" className="pr-3 text-gray-700"><FaReddit /></a>
          <a href="https://medium.com/@alkesh26" target="_blank" rel="nofollow noopener noreferrer" className="pr-3 text-gray-700"><FaMedium /></a>
          <a href="mailto:alkesh26@gmail.com" target="_blank" rel="nofollow noopener noreferrer" className="pr-3 text-gray-700"><MdEmail /></a>
        </div>
      </div>
    </footer>
  );
}
