import './Pokemon.css'
import { Link } from 'react-router-dom';
function Pokemon({name,image,id}){

    return (
        <div className='pokemon-wrapper'>
            <Link to={`/pokemon/${id}`}>
                <div className='name' id="name">{name}</div>
                <div className='image'><img src={image}/></div>
            </Link>
        </div>
    )
}

export default Pokemon;