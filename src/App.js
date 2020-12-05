import './App.css';
import { Container } from 'semantic-ui-react'

import AppMenu from './common/AppMenu'
import JobList from './job-list/JobList'

function App() {
  return (
    <div >
      <AppMenu/>
      <Container style={{margin: '2em'}}>
        <JobList/>
      </Container>
    </div>
  );
}

export default App;
