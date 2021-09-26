import Provider from '../../../core/store/Provider';
import CustomMap from '../../features/GoogleMap';
import LineBus from "../../features/LineBus"


function Home() {
    return (
        <div className="home" >
            <Provider>
                <LineBus />
                <CustomMap />
            </Provider>
        </div>
    )
}

export default Home;