import React from 'react';
import { withRouter } from 'react-router';
import SearchFilter from './Components/SearchFilter';
import ProductCard from './Components/ProductCard';
import Dropdown from './Components/Dropdown';
import './ProductLists.scss';

class ProductLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productBox: [],
      value: '전체보기',
    };
  }

  componentDidMount() {
    fetch('http://10.58.0.58:8000/products')
      .then(response => response.json())
      .then(data => {
        this.setState({
          productBox: data.response,
        });
      });
  }

  handleFilter = e => {
    console.log('안뇽');
    this.setState({ value: e.target.value });
    //전체보기
    fetch('http://10.58.0.58:8000/products')
      .then(response => response.json())
      .then(data => {
        this.setState({ productBox: data.response });
      });
    //신상품순
    fetch('http://10.58.0.58:8000/products?sort=manufacture_date')
      .then(response => response.json())
      .then(data => {
        this.setState({ productBox: data.response });
      });
    //인기순
    fetch('http://10.58.0.58:8000/products?sort=stock')
      .then(response => response.json())
      .then(data => {
        this.setState({ productBox: data.response });
      });
    //낮은 가격순
    fetch('http://10.58.0.58:8000/products?sort=-price')
      .then(response => response.json())
      .then(data => {
        this.setState({ productBox: data.response });
      });
    //높은 가격순
    fetch('http://10.58.0.58:8000/products?sort=price')
      .then(response => response.json())
      .then(data => {
        this.setState({ productBox: data.response });
      });
  };

  // toggleModal = () => {
  //   const { modalOn } = this.state;
  //   this.state({
  //     modalOn: !modalOn,
  //   });
  // };

  render() {
    console.log(this.state.productBox);
    // const { modalOn } = this.state;
    return (
      <div className="productListWrap">
        <h1 className="category">비치웨어</h1>
        {/* <SearchFilter onChange={this.state.handleChange} /> */}
        <Dropdown handleFilter={this.handleFilter} />
        <div className="productCardWrap">
          {this.state.productBox.map(product => {
            return (
              <ProductCard
                key={product.id}
                image={product.image_url}
                name={product.name}
                price={product.price}
              />
            );
          })}
        </div>
        <div className="showmore">
          <button type="button">더 보기 (30)</button>
          <img alt="Category icon" src="./images/kayoung/icon/ic-bottom.png" />
        </div>
      </div>
    );
  }
}

export default ProductLists;
