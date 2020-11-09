import Body from './components/body.component';
import { CookiesProvider } from 'react-cookie';

const App = () => {
    return(
        <CookiesProvider>
            <Body/>
        </CookiesProvider>
    )
}

export default App;