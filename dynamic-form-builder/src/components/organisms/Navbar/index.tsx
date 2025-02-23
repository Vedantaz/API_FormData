import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <button className='button'>
        <Link to="/form" className='a'>Form</Link>
      </button>
      <button className='button'>
        <Link to="/form-data" className='a'>Form Data</Link>
      </button>
      <button className='button'>
        <Link to="/HomePage" className='a'>Go to Blogs</Link>
      </button>
    </nav>
  );
};
export default Navbar;
