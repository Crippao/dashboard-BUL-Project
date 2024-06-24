
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';

const { Content } = Layout;

const App = () => {





  return (
    <Layout>
      <Navigation />
      <Layout>
        <Content className="p-3 scroll-auto min-h-[100vh]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
