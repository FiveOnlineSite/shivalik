import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import GradientLine from '../../components/atoms/GradientLine';
import InnerBanner from '../../components/atoms/InnerBanner';
import Layout from '../../components/templates/Layout';
import { Download } from 'react-feather';

const generalCampData = [
  {
    name: "Tree NOC for Golibar Project",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "Railway NOC for Golibar Project",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "National Environment Appellate Authority Order",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "Approved Layout of the Golibar, Santacruz (E) Project",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "Environmental Clearance",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "Letter from Maharashtra Pollution Control Board",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "3k order from State Government of Maharashtra",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
];

const environmentalCampData = [
    {
    name: "Tree NOC for Golibar Project",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "Railway NOC for Golibar Project",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
  {
    name: "National Environment Appellate Authority Order",
    download: "https://example.com/documents/tree-noc-golibar.pdf",
    link: '/files/loi-v.pdf',
  },
];

const documents = [
  { title: 'LOI V File', icon: '/images/pdf-icon.png' },
  { title: 'Railway NOC for Golibar Project', icon: '/images/pdf-icon.png' },
  { title: 'Tree NOC for Golibar Project', icon: '/images/pdf-icon.png' },
  { title: 'Railway NOC for Golibar Project', icon: '/images/pdf-icon.png' },
  { title: 'National Environment Appellate Authority Order', icon: '/images/pdf-icon.png' },
  { title: 'Approved Layout of the Golibar, Santacruz (E) Project', icon: '/images/pdf-icon.png' },
  { title: 'Environmental Clearance', icon: '/images/pdf-icon.png' },
  { title: 'Letter from Maharashtra Pollution Control Board', icon: '/images/pdf-icon.png' },
  { title: '3k order from State Government of Maharashtra', icon: '/images/pdf-icon.png' },
];
const documentsTwo = [
  { title: 'LOI V File', icon: '/images/pdf-icon.png' },
  { title: 'Railway NOC for Golibar Project', icon: '/images/pdf-icon.png' },
  { title: 'Tree NOC for Golibar Project', icon: '/images/pdf-icon.png' },
  { title: 'Railway NOC for Golibar Project', icon: '/images/pdf-icon.png' },
  { title: 'National Environment Appellate Authority Order', icon: '/images/pdf-icon.png' },
  { title: 'Approved Layout of the Golibar, Santacruz (E) Project', icon: '/images/pdf-icon.png' },
  { title: 'Environmental Clearance', icon: '/images/pdf-icon.png' },
  { title: 'Letter from Maharashtra Pollution Control Board', icon: '/images/pdf-icon.png' },
  { title: '3k order from State Government of Maharashtra', icon: '/images/pdf-icon.png' },
];

const Resources = () => {

  const location = useLocation();
    const currentPath = location.pathname;

  return (
    <Layout>
    {/* RESOURCES BANNER SECTION START */}
        <InnerBanner page={currentPath}
/>
      {/* RESOURCES BANNER SECTION CLOSE */}
      <section className='resources_section'>
        <div className='container'>
            <div className='tabs-one-box'>
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-general-tab" data-bs-toggle="pill" data-bs-target="#pills-general" type="button" role="tab" aria-controls="pills-general" aria-selected="true">
                        General Approvals
                    </button>
                    </li>
                    <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-environmental-tab" data-bs-toggle="pill" data-bs-target="#pills-environmental" type="button" role="tab" aria-controls="pills-environmental" aria-selected="false">
                        Environmental Clearance
                    </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    {/* General Approvals Tab */}
                    <div className="tab-pane fade show active" id="pills-general" role="tabpanel" aria-labelledby="pills-general-tab" tabIndex="0">
                    <div className='heal-one'>
                        <div className='gen-head'>
                            <GradientLine />
                            <h2 className=''>General Approvals</h2>
                        </div>
                        <div className='box-pd'>
                            <div className='row'>
                                {documents.map((doc, index) => (
                                <div className='col-lg-4 col-md-6' key={index}>
                                    <Link to={doc.link} className='link-pd'>
                                        <div className='box-pd-one'>
                                            <h6>{doc.title}</h6>
                                            <div className='box-pd-img'>
                                                <img src={doc.icon} alt='download-icon' />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                ))}
                            </div>
                        </div>

                        <div className='table-one table-responsive'>
                        <table className="table">
                            <thead>
                            <tr>
                                <th width="80px">Sr. No.</th>
                                <th>Name</th>
                                <th>Download</th>
                            </tr>
                            </thead>
                            <tbody>
                                {generalCampData.map((item, index) => (
                                    <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{item.name}</td>
                                    <td width="80px" className='text-center'>
                                        {item.download ? (
                                        <Link to={item.download} download target="_blank" className='down-pd' rel="noopener noreferrer"> <Download /> </Link>
                                        ) : (
                                        'N/A'
                                        )}
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>

                    {/* Environmental Clearance Tab */}
                    <div className="tab-pane fade" id="pills-environmental" role="tabpanel" aria-labelledby="pills-environmental-tab" tabIndex="0">
                    <div className='heal-one'>
                         <div className='gen-head'>
                            <GradientLine />
                            <h2 className=''>Environmental Clearance</h2>
                        </div>
                        <div className='box-pd'>
                            <div className='row'>
                                {documentsTwo.map((doc, index) => (
                                <div className='col-lg-4 col-md-6' key={index}>
                                    <Link to={doc.link} className='link-pd'>
                                        <div className='box-pd-one'>
                                            <h6>{doc.title}</h6>
                                            <div className='box-pd-img'>
                                                <img src={doc.icon} alt='download-icon' />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                ))}
                            </div>
                        </div>

                        {/* table section */}
                        <div className='resources_table_download'>  
                        <div className='table-one table-responsive'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th width="80px">Sr. No.</th>
                                    <th>Name</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {environmentalCampData.map((item, index) => (
                                    <tr key={index}>
                                    <td>{index + 1}.</td>
                                    <td>{item.name}</td>
                                    <td width="80px" className='text-center'>
                                        {item.download ? (
                                        <a href={item.download} download target="_blank" className='down-pd' rel="noopener noreferrer"> <Download /> </a>
                                        ) : (
                                        'N/A'
                                        )}
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
        
    </Layout>
  )
}

export default Resources