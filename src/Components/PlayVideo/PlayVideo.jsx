import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    /* const fetchVideoData = async () => {
        //Fetching videos data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}=${API_KEY}`;
        await fetch(videoDetails_url).then(res=>res.json()).then(data => setApiData(data.items[0]));
        console.log(data.items);        
    } */  
    
    const fetchVideoData = async () => {
        try {
            //Fetching videos data
            const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
            const response = await fetch(videoDetails_url);
    
            if (!response.ok)
            {
                throw new Error('Fail to load video details');
            }
    
            const data = await response.json();
    
            // Check data.items is not undefined
            if (data.items && data.items.length > 0)
            {
                setApiData(data.items[0]);
            }
            else
            {                
                console.error('No data was loaded fromAPI');
            }
        } catch (error) {
            console.error('Fail to load video details:', error.message);            
        }
    }

    const fetchOtherData = async () => {
        //Fetching channel data
        const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY} `;
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));

        //Fetching comment data
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
        await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items));
    }
    

    useEffect(()=>{
        fetchVideoData();        
    },[videoId])

    useEffect(() => {
        fetchOtherData();
    },[apiData])

  return (
    <div className='play-video'>
        {/* <video src={video1} controls autoPlay muted></video> */}        
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):"00"} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"From The Future"}</p>
            <div>
                <span><img src={like} alt="Like Button" />{apiData?value_converter(apiData.statistics.likeCount):"0,0"}</span>
                <span><img src={dislike} alt="Dislike Button" /></span>
                <span><img src={share} alt="Share Button" />Share</span>
                <span><img src={save} alt="Save Button" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:"Channel Title"}</p>
                <span>{channelData?value_converter(channelData.statistics.subscriberCount):"0,0"} Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            <p>{apiData?apiData.snippet.description.slice(0, 250):"No description"}</p>         
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount):"0,0"} Comments</h4>
            {commentData.map((item, index) => {

                return (
                    <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User Profile" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="Like Button" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="Dislike Button" />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default PlayVideo