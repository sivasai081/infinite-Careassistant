import Head from 'next/head'
import Login from '../components/login';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


export default function Home() {
  return (
    <React.Fragment>
      <Head>
            <title>Healthlligence</title>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
      </Head>
     
      <Login />
      
   </React.Fragment>
  )
}
