import logo from '../assets/logo.webp'

const Navbar = () => {
  return (
    <>
      <nav className='nav'>
        <div className='nav-shine'>
          <a href="/">
            <div><img src={logo} className="logo" alt="DumpTruckDB" />
              <span>DumpTruckDB</span></div>
          </a>
        </div>
        <div>
          <a href='https://github.com/spacedust26/dumptruckdb' className='git' target='_blank'>Github</a>
        </div>
      </nav>
    </>
  )
}

export default Navbar;