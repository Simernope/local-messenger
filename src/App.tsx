import React from 'react';
import MainPage from "./pages/MainPage/MainPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ChatPage from "./pages/ChatPage/ChatPage";


function App() {

    return (
        <main className="container-fluid p-0">
            <BrowserRouter>
                <React.Fragment>
                    <Header/>
                </React.Fragment>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/chat/:id' element={<ChatPage/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </main>
    );
}

export default App;
