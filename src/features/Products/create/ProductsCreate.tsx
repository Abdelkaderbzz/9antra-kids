import Button from '@src/components/Button/Button'
import ImageUpload from './ImageUplaod/ImageUpload'

const ProductsCreate = () => {
  return (
    <div className="products_crud_container">
      <div className="products_crud_header">
        <h1>Create Product</h1>
        <div className="product_crud_header_btns">
          <Button variant="cancel">Cancel</Button>
          <Button variant="secondary">Create</Button>
        </div>
      </div>
      <div className="products_crud_form">
        <div className="form_upload_products_images">
          <div className="form_upload_products_images_header">
            <h2>Images</h2>
            <p>The images will appear on the online store and on the point of sale.</p>
          </div>
          <ImageUpload />
        </div>
      </div>
    </div>
  )
}

export default ProductsCreate
