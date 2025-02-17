import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import { PatientProvider } from '@/context/PatientContext';

import Views from '@/views'
import appConfig from './configs/app.config'
import './locales'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <AuthProvider>
                    <PatientProvider>
                        <Layout>
                            <Views />
                        </Layout>
                    </PatientProvider>
                </AuthProvider>
            </BrowserRouter>
        </Theme>
    )
}

export default App
