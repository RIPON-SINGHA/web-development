import einstein from './assets/albert einstein.jpg'
import './card.css'

function Card() {
    return (

        <>
            <div className="card-body">
                <img src={einstein} alt="einstein" className="pic"/>    
                <p className="name">Albert Einstein</p>
                <p className="para">Worlds most briliant scientist. Love his works</p>
            </div>
        </>
    )
}

export default Card