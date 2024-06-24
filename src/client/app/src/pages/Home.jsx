/* eslint-disable no-unused-vars */
import { Typography, Image } from 'antd';
const { Title } = Typography;

const Home = () => {

    return (
        <div className='grid grid-cols-1 gap-4 place-items-center p-10 mt-8 text-center text-neutral-600'>
            <Image
                className='rounded-full'
                width={350}
                src="./lib/image/home_image.jpg"
            />
            <Title className='text-9xl mt-8'>BUL PROJECT</Title>
            <div className='text-xl mt-6'>
                Il progetto Banda Ultra Larga (BUL) rappresenta un fondamentale pilastro nell&apos;evoluzione delle infrastrutture di connettività, mirando a fornire accesso ad Internet ad alta velocità a una vasta gamma di utenti. L&apos;obiettivo principale di questo progetto è mostrare i risultati di un&apos;analisi dettagliata dei dati relativi alla copertura e alla programmazione dei lavori per due tecnologie chiave: la Fibra Ottica (FTTH) e il Fixed Wireless Access (FWA).
            </div>
        </div>
    )
}

export default Home;