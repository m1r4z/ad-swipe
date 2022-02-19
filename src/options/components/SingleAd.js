import React, { useState } from 'react';
import FacebookIcon from './../components/svg-components/FacebookIcon';
import StarIcon from './../components/svg-components/StarIcon';
import StarIcon2 from './../components/svg-components/StarIcon2';
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
import SlickCarousel from './SlickCarousel';
import ReactPlayer from 'react-player'

import {STORAGE_KEY_FB_AD, STORAGE_KEY_TOTAL_FAVORITES} from '../../common/constant';
import {setDataInStorage, getDataFromStorage} from '../../common/storageUtil';
const SingleAd = ({ad}) => {

    const [isReadMoreClicked, setIsReadMoreClicked] = useState(false);
    const [isFavoriteTrue, setIsFavoriteTrue] = useState(ad.isFavorite);

    const handleReadMore = () => {
        setIsReadMoreClicked(!isReadMoreClicked);
    }

    let classes = 'post-container';
    classes = isReadMoreClicked ? classes + ' expanded' : classes;

    let readText = 'Read';
    readText = isReadMoreClicked ? readText + ' Less' : readText + ' More';

    const handleFavorite = () => {
        getDataFromStorage(STORAGE_KEY_TOTAL_FAVORITES).then((response)=>{
            if(ad.isFavorite){
                response = --response;
            }else{
                response = ++response;
            }
            setDataInStorage(STORAGE_KEY_TOTAL_FAVORITES, response).then(()=>{
                console.log('Total Ads Favorites changed');
            })
        });

        getDataFromStorage(STORAGE_KEY_FB_AD).then((response)=>{
            var newData = response.map((singleAd)=>{
                if(singleAd.post_id === ad.post_id){
                    setIsFavoriteTrue(!singleAd?.isFavorite);
                    return {...singleAd, isFavorite: !singleAd?.isFavorite};
                }else{
                    return singleAd;
                }
            });

            setDataInStorage(STORAGE_KEY_FB_AD, newData).then(()=>{
                console.log(' data changed');
            })
        })
    }
    return (
        <div className='single-ad-container'>
            <div className='ad-heading-container'>
                <div className='logo-title-container'>
                    <div className='logo-container'>
                        <img src={ad.logoUrl} alt="logo"/>
                    </div>
                    <div className='title-container'>
                        <a href="#" className='title'>{ad.name}</a>
                        <p className='sponsored'><GlobeIcon /> <span>Sponsored</span></p>
                    </div>
                </div>
                <div className='links-container'>
                    <a href="#" className='ad-library'>Ad Library</a>
                    <span className='facebook-icon'><FacebookIcon /></span>
                    <span className='star-icon' onClick={handleFavorite}>{isFavoriteTrue ?<StarIcon2 /> : <StarIcon />}</span>
                    <span className='trash-icon'><TrashIcon /></span>
                </div>
            </div>
            <div className='post-image-container'>
                <div className={classes} onClick={handleReadMore}>
                    <p>{ad.text}</p>
                    <span className='read-more' >{readText}</span>
                </div>
                <div className='image-container'>
                    {ad.videoUrl && !ad.imageUrl? 
                        <video width="100%" height="240" controls>
                            <source src="https://www.youtube.com/watch?v=CRbZVD9OgLg"></source>
                            <source src="https://www.youtube.com/watch?v=CRbZVD9OgLg"></source>
                        </video> 
                        // <ReactPlayer url={ad.videoUrl} />
                        // <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                    : ad.imageUrl ? 
                    <img src={ad.imageUrl} alt='alt'/> :
                        ad.thumbnailImage ? 
                            <img src={ad.thumbnailImage} alt='alt'/> :
                            <img src="https://scontent.fdac149-1.fna.fbcdn.net/v/t45.1600-4/cp0/q90/spS444/p526x296/273855500_23849073265530584_1757365283259183284_n.png.jpg?_nc_cat=104&ccb=1-5&_nc_sid=68ce8d&_nc_eui2=AeGWqUg2i6-GnVnOrSY-ILtr5-Ct3DU6tp_n4K3cNTq2n2CMb2kf7OZB7-Noje3o_eZJGrPMtob_itEBsDeDna9F&_nc_ohc=4SnItHBCaYYAX8drSHw&_nc_ht=scontent.fdac149-1.fna&oh=00_AT-2uKhJuhrHxpb_5LJ_BDLCnz3prnz9p1NK2RpJL3RPNw&oe=62150841" alt='alt'/> 
                    }
                    {ad.carouselNode ? <SlickCarousel /> : null}
                </div>
                <div className='footer-container'>
                    <div className='footer-domain-text-container'>
                        <span className='footer-domain'>
                            {ad?.['footerActionLinks']?.['link_display'] ? 
                                ad?.['footerActionLinks']?.['link_display'] :
                                ad?.['footerDomainName'] ? ad?.['footerDomainName'] : null
                            }
                        </span>
                        <span className='footer-text-title'>
                            {ad?.['footerActionLinks']?.['link_title'] ? 
                                ad?.['footerActionLinks']?.['link_title'] :
                                ad?.['footerTitleText'] ? ad?.['footerTitleText'] : null
                            }
                        </span>
                        {/* <span className='footer-text'>
                            {ad?.['footerDescriptionText'] ? ad?.['footerDescriptionText'] : null}
                        </span> */}
                    </div>
                    <div className='footer-button-container'>
                        {(ad.footerActionButtonName || ad.actionTitle) ? 
                            <a href={ad?.['footerActionLinks']?.['url']}>{ad.footerActionButtonName ? ad.footerActionButtonName : ad.actionTitle}</a> : 
                            null
                        }
                    </div>
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
                    <span className='total-count'> {ad.likeCount}</span>
                </div>
                <div className='comment-share-view-container'>
                    <span className='comment-icon fb-icon'><CommentIcon/> <span className='total-count'> {ad.commentCount}</span></span>
                    <span className='share-icon fb-icon'><ShareIcon/> <span className='total-count'> {ad.shareCount}</span></span>
                    {ad.viewCount? <span className='eye-icon fb-icon'><EyeIcon/> <span className='total-count'> {ad.viewCount}</span></span> : ""}
                </div>
            </div>
        </div>
    );
}

export default SingleAd;