import Header from '../components/Header';


function CreateLayout( {children} ) {
    return ( 
        <div>
            <Header />
            <div className='container'>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
     );
}

export default CreateLayout;