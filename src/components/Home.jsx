import logobg from '../assets/logo-bg.png';

const Home = () => {
  return (
    <div className='hero-outer'>
      <div className='hero-inner-left'>
        <img src={logobg} alt="DumpTruckDB" className="logobg" />
      </div>
      <div className='hero-inner-right'>
        <div>
          <h1 className="title">Redefining the way you interact with data <span><img src='/file.gif'  style={{width: "40px"}}/></span></h1>
          <p className="subtitle">DumpTruckDB is your go-to SQL-powered data querying tool. Whether you're handling large datasets or just need a quick way to explore CSV files, we've got you covered. No more messy spreadsheets—upload, write, and execute queries effortlessly! </p>
        </div>
        <div>
          <button><a href='/query'>Get Started</a></button>
          <a className="github-link" href="https://github.com/spacedust26/dumptruckdb" target="_blank" rel="noopener noreferrer">View on Github →</a>
        </div>
      </div>
    </div>
  );
};

export default Home;