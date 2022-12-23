import Header from './header';
import Footer from './footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <div className="max-w-screen-lg px-4 py-4 mx-auto flex flex-col">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
