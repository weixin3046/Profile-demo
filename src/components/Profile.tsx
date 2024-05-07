import { Button, Form, Typography } from 'antd';
import { ProfileData } from '../pages/profilepage';

const { Title, Text } = Typography;

const Profile = ({ profile, onEdit }: { profile: ProfileData; onEdit: () => void }) => {
  return (
    <>
      <Title level={2}>User Profile</Title>
      <Form.Item label="Username" name="username">
        <Text> {profile.username}</Text>
      </Form.Item>
      <Form.Item label="E-mail" name="email">
        <Text> {profile.email}</Text>
      </Form.Item>
      <Form.Item name="phone" label="Phone Number">
        <Text> {profile.phone}</Text>
      </Form.Item>

      <Button onClick={onEdit} type="primary">
        Edit
      </Button>
    </>
  );
};

export default Profile;
