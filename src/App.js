import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

import { DefaultLayout } from './components/Layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout; 
                        
                        if(route.layout){
                            Layout = route.layout
                        }
                        else if (route.layout === null){
                            Layout = Fragment
                        }


                        //component ban đầu đang là string, gán nó cho biến Page để nó thành component
                        //Lưu ý: Page phải viết hoa mới là component
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
