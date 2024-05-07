import { useState } from 'react';
import { Button, Form, Input, Select, Typography } from 'antd';
import { ProfileData } from '../pages/profilepage';

const { Title } = Typography;
const { Option } = Select;

const EditProfile = ({ profile, onSave }: { profile: ProfileData; onSave: (profile: ProfileData) => void }) => {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);

  const handleSave = () => {
    onSave({ username, email, phone });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Title level={2}>Edit Profile</Title>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input defaultValue={username} value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}>
        <Input value={email} defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}>
        <Input
          addonBefore={prefixSelector}
          style={{ width: '100%' }}
          value={phone}
          defaultValue={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Item>
      <Button onClick={handleSave} type="primary">
        Save
      </Button>
    </>
  );
};

export default EditProfile;
