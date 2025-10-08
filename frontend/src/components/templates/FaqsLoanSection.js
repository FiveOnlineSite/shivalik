import React, { useEffect, useState } from 'react';
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css';
import axios from 'axios';

const groupByCategory = (array = []) => {
  return array.reduce((acc, item) => {
    const catId = item.faq_category?._id;
    if (!catId) return acc;

    if (!acc[catId]) {
      acc[catId] = {
        category: item.faq_category,
        items: [],
      };
    }
    acc[catId].items.push(item);
    return acc;
  }, {});
};

const FaqLoanSection = () => {
  const [activeIds, setActiveIds] = useState(new Set());
  const [FAQContent, setFAQContent] = useState([]);

  const handleToggle = (id) => {
    setActiveIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios({
          method: 'GET',
          baseURL: `${apiUrl}/api/`,
          url: 'faq-content',
        });

        const contents = response.data.Contents || [];
        setFAQContent(contents);

        if (contents.length > 0) {
          // ✅ Group by category
          const grouped = groupByCategory(contents);

          // ✅ Collect first FAQ from each category
          const firstFaqIds = Object.values(grouped).map(
            ({ items }) => items[0]?._id
          );

          // ✅ Set them as initially active
          setActiveIds(new Set(firstFaqIds.filter(Boolean)));
        }
      } catch (error) {
        console.error('Error fetching faq content:', error);
      }
    };

    fetchFAQContent();
  }, []);

  const grouped = FAQContent?.length ? groupByCategory(FAQContent) : {};

  const renderAccordion = (items) => (
    <div className="accordion">
      {items.map((faq) => (
        <div className="accordion-item" key={faq._id}>
          <h2 className="accordion-header" id={`heading-${faq._id}`}>
            <button
              className={`accordion-button ${
                activeIds.has(faq._id) ? '' : 'collapsed'
              }`}
              type="button"
              onClick={() => handleToggle(faq._id)}
              aria-expanded={activeIds.has(faq._id)}
              aria-controls={`collapse-${faq._id}`}
            >
              {faq.question}
            </button>
          </h2>
          <div
            id={`collapse-${faq._id}`}
            className={`accordion-collapse collapse ${
              activeIds.has(faq._id) ? 'show' : ''
            }`}
            aria-labelledby={`heading-${faq._id}`}
          >
            <div className="accordion-body">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-grey pt-5 pb-5 loan-faq">
      {Object.values(grouped).map(({ category, items }) => {
        const midpoint = Math.ceil(items.length / 2);
        const col1Items = items.slice(0, midpoint);
        const col2Items = items.slice(midpoint);

        return (
          <div className="container" key={category._id}>
            <div className="row justify-content-left mb-3 my-4">
              <GradientLine />
              <h3 className={styles.sectionTitle}>{category.title}</h3>

              <div className="col-md-6">{renderAccordion(col1Items)}</div>
              <div className="col-md-6">{renderAccordion(col2Items)}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FaqLoanSection;
