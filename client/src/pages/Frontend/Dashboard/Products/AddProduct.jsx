import { useState } from "react";
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

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Product image must be upload");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title.trim());
      formData.append("description", values.description.trim());
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("stockQuantity", values.stockQuantity);
      
      formData.append("image", fileList[0].originFileObj);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_apiURL}/products/add`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.isError) {
        message.success(response.data.message || "Product successfully added!");
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      const errorMsg =
        error.response?.data?.message || "Error while saving product.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 650, margin: "40px auto", padding: "0 16px" }}>
      <Card bordered={false} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Add New Product
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ stockQuantity: 1 }}
        >
          {/* Title */}
          <Form.Item
            label="Product Title"
            name="title"
            rules={[
              { required: true, message: "Title must be required" },
              { min: 2, message: "Title must be atleast 2 character" },
            ]}
          >
            <Input placeholder="e.g. Dell Latitude 5400 Laptop" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please must be enter description" }]}
          >
            <TextArea rows={4} placeholder="Enter detailed product description..." />
          </Form.Item>

          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              label="Price ($)"
              name="price"
              style={{ flex: 1 }}
              rules={[
                { required: true, message: "Price must be required" },
                { type: "number", min: 0, message: "Valid enter valid price! Must be non-negative" },
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
                { required: true, message: "Stock quantity is required" },
                { type: "number", min: 0, message: "Quantity must be positive" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0} precision={0} />
            </Form.Item>
          </div>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category is required" }]}
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
            required
            tooltip="Only JPG/PNG images supported"
          >
            <Upload
              beforeUpload={() => false} // Auto upload stop karne ke liye
              fileList={fileList}
              onChange={handleUploadChange}
              maxCount={1}
              accept="image/png, image/jpg"
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
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;