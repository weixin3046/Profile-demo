import { Flex, Form, Layout } from 'antd';
import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import axios from 'axios';
import EditProfile from '../components/EditProfile';

const { Content } = Layout;

// 主界面展示用户 Profile 信息，展示用户名、邮箱、手机号等字段（无需考虑用户登录、退出等流程）
// 主界面提供编辑按钮，点击后切换到编辑模式，编辑模式下可修改所有字段，保存后会切换为展示模式展示最新的数据
// 用户 Profile 持久化保存到后端，建议使用轻量的数据库，可自行选择 library

export interface ProfileData {
  username: string;
  email: string;
  phone: string;
}

const PofilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>({ username: '', email: '', phone: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get<ProfileData>('/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async (updatedProfile: ProfileData) => {
    try {
      await axios.put('/api/profile', updatedProfile);
      setProfile(updatedProfile);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <Layout>
        <Content className="content">
          <Flex gap="middle" align="center" vertical>
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, width: '100%' }}
              layout={'horizontal'}>
              {isEditMode ? (
                <EditProfile profile={profile} onSave={handleSave} />
              ) : (
                <Profile profile={profile} onEdit={handleEdit} />
              )}
            </Form>
          </Flex>
        </Content>
      </Layout>
    </>
  );
};

export default PofilePage;
