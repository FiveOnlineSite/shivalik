import React from 'react';
import BlogListBox from '../molecules/BlogListBox';
import BlogBox from '../molecules/BlogBox';

const blogs = [
  {
    image: 'images/blog10.png',
    title: 'A Guide to Buying Your First Affordable Home in Mumbai',
    link: 'a-guide-to-buying-your-first-affordable-home-in-mumbai',
  },
  {
    image: 'images/top-10-reasons-buy-home-bandra.png',
    title: "Top 10 Reasons to Buy a Home in Bandra",
    link: 'top-10-reasons-to-buy-a-home-in-bandra',
  },
  {
    image: 'images/blog2.jpg',
    title: "Bandra's Best-Kept Secret: Luxury Living on a Budget",
    link: 'bandra-best-kept-secret-luxury-living-on-a-budget',
  },
  {
    image: 'images/blog3.png',
    title: "Investing in Bandra's Future: Affordable Luxury Homes by Shivalik Ventures",
    link: 'investing-in-Bandra-future-affordable-luxury-homes',
  },
  {
    image: 'images/blog4.png',
    title: "Get Your Dream Home in Mumbai: How to Secure the Right Home Loan?",
    link: 'get-your-dream-home-mumbai-how-to-secure-the-right-home-loan',
  },
  {
    image: 'images/blog5.png',
    title: "No More Renting: How to Use Home Loans to Transition to Mumbai Homeownership?",
    link: 'how-to-get-a-home-loan-to-buy-a-home-in-mumbai',
  },
  // {
  //   image: 'images/blog6.png',
  //   title: "A Spiritual Journey: Exploring the Significance of Our Lady of the Mount Basilica in Bandra",
  //   link: '#',
  // },
];

const BlogListing = () => {
  return (
          <BlogListBox />
  )
}

export default BlogListing