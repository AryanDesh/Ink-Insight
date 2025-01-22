import './Blogging.scss';
import Editor from '../editor';
import { Sidebar } from '../components';
import { SidebarItems } from '../components/Sidebar';
import { LifeBuoy, Receipt, Boxes, Package, UserCircle  } from 'lucide-react';
const Blogging = () => {

  return (
    <div className='wrapper'>
      <div className='content'>
        <Sidebar>
          <SidebarItems icon= {<LifeBuoy  size={20}/>} text='Dashboard' active={true}></SidebarItems>
          <SidebarItems icon= {<Receipt  size={20}/>} text='Dashboard' alert={true}></SidebarItems>
          <SidebarItems icon= {<Boxes  size={20}/>} text='Dashboard' alert={true}></SidebarItems>
          <SidebarItems icon= {<Package  size={20}/>} text='Dashboard' alert={true}></SidebarItems>
          <SidebarItems icon= {<UserCircle  size={20}/>} text='Dashboard' alert={true}></SidebarItems>
          <hr />
          <SidebarItems icon= {<LifeBuoy  size={20}/>} text='Dashboard' alert={true}></SidebarItems>
          <SidebarItems icon= {<LifeBuoy  size={20}/>} text='Dashboard' alert={true}></SidebarItems>
        </Sidebar>
      </div>
      <div className='editor'>
        <Editor></Editor>
      </div>

    </div>
  );
};

export default Blogging;
