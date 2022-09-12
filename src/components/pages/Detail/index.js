import AccordionUI from '../../UIcomponents/AccordionUI';
import TableUI from '../../UIcomponents/TableUI';

function createData(event, price, from, to, time) {
    return { event, price, from, to, time };
}

const rows = [
    createData('Mint', null, 'Null Address', 'NFT_Rabbithole', '18:00:56'),
    createData('List', 0.85, 'NFT_Rabbithole', ' ', '18:06:08'),
    createData('List', 1, 'NFT_Rabbithole', ' ', '18:06:09'),
    createData('List', 2, 'NFT_Rabbithole', ' ', '18:06:10'),
    createData('List', 31, 'NFT_Rabbithole', ' ', '18:06:11'),
    createData('List', 15, 'NFT_Rabbithole', ' ', '18:06:12'),
    createData('List', 100, 'NFT_Rabbithole', ' ', '18:06:13'),
    createData('List', 99, 'NFT_Rabbithole', ' ', '18:06:14'),
];

function Detail() {
    return (
      <div>
        
      </div>
    );
}

export default Detail;
