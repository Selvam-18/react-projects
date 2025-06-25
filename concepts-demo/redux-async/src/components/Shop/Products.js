
import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCTS = [{
  id: 'p1',
  price: 6,
  title: 'PlayStation',
  description: 'X O'},
{
  id: 'p2',
  price: 4,
  title: 'XBox',
  description: 'A Y X B '
}
]

const Products = (props) => {

  
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
        
      </ul>
    </section>
  );
};

export default Products;
