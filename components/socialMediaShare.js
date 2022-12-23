import { TwitterShareButton, LinkedinShareButton, RedditShareButton, TumblrShareButton } from 'react-share';
import { FaTwitter, FaLinkedin, FaReddit, FaTumblr } from 'react-icons/fa';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const SocialMediaShare = (props) => {
  const { title, description, hashtags } = props.frontmatter;
  const basePath = process.env.BASE_PATH;
  const relativePath = useRouter().asPath;
  const fullPath = `${basePath}${relativePath}`;

  return (
    <div className="flex flex-col items-center">
      <div className="justify-center">Share this post!</div>
      <div className="flex flex-row">
        <div>
          <TwitterShareButton url={fullPath} title={title} description={description} hashtags={hashtags}>
            <FaTwitter />
          </TwitterShareButton>
        </div>
        <div className="pl-5">
          <LinkedinShareButton url={fullPath} title={title} summary={description} source={process.env.BASE_PATH}>
            <FaLinkedin />
          </LinkedinShareButton>
        </div>
        <div className="pl-5">
          <RedditShareButton url={fullPath} title={title} description={description}>
            <FaReddit />
          </RedditShareButton>
        </div>
        <div className="pl-5">
          <TumblrShareButton url={fullPath} title={title} caption={description} tags={hashtags}>
            <FaTumblr />
          </TumblrShareButton>
        </div>
      </div>
    </div>
  );
};

SocialMediaShare.propTypes = {
  frontmatter: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  hashtags: PropTypes.string
};

export default SocialMediaShare;
