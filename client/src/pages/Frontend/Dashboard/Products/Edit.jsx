import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  Card,
  message,
  Typography,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Edit = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const Navigate=useNavigate();
  const { id } = useParams();
const [product,setProduct]=useState({})
  const getProduct=async()=>{
    await axios.get(`${import.meta.env.VITE_apiURL}/products/single?id=${id}`)
      .then(({status,data})=>{
if(status===200)
{
  const {message: resMessage,product}=data;
  form.setFieldsValue({
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          stockQuantity: product.stockQuantity,
        });
}
      }).catch((error)=>{
        console.error(error)
        message.error(error.response?.data?.message);
      })
  }
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const onFinish = async (values) => {
    

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("description", values.description.trim());
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("stockQuantity", values.stockQuantity);

    
      if (fileList.length > 0 && fileList[0]?.originFileObj) {
  formData.append("image", fileList[0].originFileObj);
}

    

      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${import.meta.env.VITE_apiURL}/products/update?id=${id}`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.isError) {
        message.success(
          response.data.message || "Product updated successfully!"
        );
        form.resetFields();
        setFileList([]);
        Navigate(-1);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to update the product.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
getProduct();
},[])
  return (
    <div style={{ maxWidth: 650, margin: "40px auto", padding: "0 16px" }}>
      <Card
        bordered={false}
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Edit Product
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ stockQuantity: 1, title: product?.title, description: product?.description,price: product?.price,category:product?.category }}
        >
          <Form.Item
            label="Product Title"
            name="title"
            rules={[
              { required: true, message: "Please enter a title!" },
              {
                min: 2,
                message: "Title must be at least 2 characters long!",
              },
            ]}
          >
            <Input  placeholder="e.g. Wireless Gaming Mouse" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter a description!" },
            ]}
          >
            <TextArea
             
              rows={4}
              placeholder="Enter detailed product description..."
            />
          </Form.Item>

          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
            
              label="Price ($)"
              name="price"
              style={{ flex: 1 }}
              rules={[
                { required: true, message: "Please enter a price!" },
                {
                  type: "number",
                  min: 0,
                  message: "Please enter a valid price!",
                },
              ]}
            >
              <InputNumber
               
                style={{ width: "100%" }}
                placeholder="0.00"
                min={0}
                precision={2}
              />
            </Form.Item>

            <Form.Item
              label="Stock Quantity"
              name="stockQuantity"
              style={{ flex: 1 }}
              rules={[
                {
                  required: true,
                  message: "Please enter stock quantity!",
                },
                {
                  type: "number",
                  min: 0,
                  message: "Quantity must be a positive number!",
                },
              ]}
            >
              <InputNumber value={product?.stockQuantity} style={{ width: "100%" }} min={0} precision={0} />
            </Form.Item>
          </div>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please select a category!" },
            ]}
          >
            <Select placeholder="Select a category">
              <Option value="electronics">Electronics</Option>
              <Option value="men's-clothing">Men's Clothing</Option>
              <Option value="women's-clothing">Women's Clothing</Option>
              <Option value="jewelery">Jewelery</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Product Image"
          
            tooltip="Only JPG/PNG images supported"
          >
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleUploadChange}
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              icon={<PlusOutlined />}
            >
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Edit;