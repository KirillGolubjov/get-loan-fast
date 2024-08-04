import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/shared/header';
import { PersonalForm } from './components/shared/personal-form';
import { AddressForm } from './components/shared/address-form';
import { LoanForm } from './components/shared/loan-form';
import { ProtectedFormRoute } from './components/shared/protected-form-route';
import Modal from './components/shared/modal';

function App() {
  return (
    <Router>
      <Header />
      <main className='max-w-[1280px] mx-auto w-full py-10 flex justify-center'>
        <div className='max-w-[500px] flex-1 grid'>
          <Routes>
            <Route path='/' element={<PersonalForm />} />
            <Route
              path='/address'
              element={
                <ProtectedFormRoute>
                  <AddressForm />
                </ProtectedFormRoute>
              }
            />
            <Route
              path='/loan'
              element={
                <ProtectedFormRoute>
                  <Modal>
                    <LoanForm />
                  </Modal>
                </ProtectedFormRoute>
              }
            />
          </Routes>
        </div>
      </main>
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'grey',
            color: 'black',
          },
        }}
      />
    </Router>
  );
}

export default App;
