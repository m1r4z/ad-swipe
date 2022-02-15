import React from 'react';
import FacebookIcon from './../components/svg-components/FacebookIcon';
import StarIcon from './../components/svg-components/StarIcon';
import TrashIcon from './../components/svg-components/TrashIcon';
import GlobeIcon from './../components/svg-components/GlobeIcon';
import LikeIcon from './../components/svg-components/LikeIcon';
import HeartIcon from './../components/svg-components/HeartIcon';
import CareIcon from './../components/svg-components/CareIcon';
import HahaIcon from './../components/svg-components/HahaIcon';
import WowIcon from './../components/svg-components/WowIcon';
import SadIcon from './../components/svg-components/SadIcon';
import AngryIcon from './../components/svg-components/AngryIcon';
import CommentIcon from './../components/svg-components/CommentIcon';
import ShareIcon from './../components/svg-components/ShareIcon';
import EyeIcon from './../components/svg-components/EyeIcon';

const SingleAd = () => {
    return (
        <div className='single-ad-container'>
            <div className='ad-heading-container'>
                <div className='logo-title-container'>
                    <div className='logo-container'>
                        <img src="https://adsavermedia.s3.amazonaws.com/610034c4a6cc5997087f3af868e54efe.jpg?AWSAccessKeyId=AKIA34P4F3FZ3GCOOF2G&Signature=%2BmUt%2FbXb423CteAkUxIBccaU2rc%3D&Expires=1675285989" alt="logo"/>
                    </div>
                    <div className='title-container'>
                        <a href="#" className='title'>Findy Global</a>
                        <p className='sponsored'><GlobeIcon /> <span>Sponsored</span></p>
                    </div>
                </div>
                <div className='links-container'>
                    <a href="#" className='ad-library'>Ad Library</a>
                    <span className='facebook-icon'><FacebookIcon /></span>
                    <span className='star-icon'><StarIcon /></span>
                    <span className='trash-icon'><TrashIcon /></span>
                </div>
            </div>
            <div className='post-image-container'>
                <div className='post-container'>
                    <p>Find IT / Web engineering jobs in Japan! Findy Global is an HR service specializes in analyzing your engineering skills based on the development history on GitHub. Get offers from Japanese tech-companies that match your engineering skills!</p>
                </div>
                <div className='image-container'>
                    <img src="https://adsavermedia.s3.amazonaws.com/4c993e0ea47d2f9dfd4039c3ad2ec554.jpg?AWSAccessKeyId=AKIA34P4F3FZ3GCOOF2G&Signature=ptYDFY6cSnbFJ5HC6mm51%2Br5dAc%3D&Expires=1674063475" alt='alt'/>

                </div>
            </div>
            <div className='like-comment-container'>
                <div className='like-container'>
                    <span className='like-icon fb-icon'><LikeIcon/></span>
                    <span className='heart-icon fb-icon'><HeartIcon/></span>
                    <span className='care-icon fb-icon'><CareIcon/></span>
                    <span className='haha-icon fb-icon'><HahaIcon/></span>
                    <span className='wow-icon fb-icon'><WowIcon/></span>
                    <span className='sad-icon fb-icon'><SadIcon/></span>
                    <span className='angry-icon fb-icon'><AngryIcon/></span>
                    <span className='total-count'> 7k</span>
                </div>
                <div className='comment-share-view-container'>
                    <span className='comment-icon fb-icon'><CommentIcon/> <span className='total-count'> 254</span></span>
                    <span className='share-icon fb-icon'><ShareIcon/> <span className='total-count'> 89</span></span>
                    <span className='eye-icon fb-icon'><EyeIcon/> <span className='total-count'> 500</span></span>
                </div>
            </div>
        </div>
    );
}

export default SingleAd;