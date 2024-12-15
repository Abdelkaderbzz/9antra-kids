import { useEffect } from 'react';
import MAP from "../../assets/Map.svg";
import Button from "../../assets/button.svg";
import { useNavigate } from 'react-router-dom';

const Map = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const anchor = document.getElementById('buttom');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="container-map">
            <img src={MAP} alt="" className="image-map" />
            <span className="start-img">
                <img onClick={() => {
                    navigate('/lessons')
                }} src={Button} alt="" />
            </span>
            <a id="buttom"></a>
        </div>
    );
};

export default Map;