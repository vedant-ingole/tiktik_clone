import React, { useEffect, useRef, useState } from 'react'
import { Video } from '../types';
import { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

interface IProps {
    post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
    // console.log(post.postedBy.userName);

    const [isHover, setIshover] = useState(false)
    const [playing, setplaying] = useState(false)
    const [isVideoMuted, setIsVideoMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const onVideoPress = () => {
        if(playing) {
            videoRef?.current?.pause()
            setplaying(false)
        } else {
            videoRef?.current?.play()
            setplaying(true)
        }
    }

    useEffect(() => {
      if(videoRef?.current) {
        videoRef.current.muted = isVideoMuted
      }
    }, [isVideoMuted])
    

  return (
    <div className='flex flex-col border-b-2 border-gray-200 font-semibold' >
        <div>
            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                <div className="md:w-16 md:h-16 w-10 h-10">
                    <Link href={`profile/${post.postedBy._id}`}>
                        <>
                            <Image 
                                width={62}
                                height={62}
                                className="rounded-full"
                                src={post.postedBy.image}
                                alt='photo'
                                layout="responsive"
                            />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={`profile/${post.postedBy._id}`}>
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                                {post.postedBy.userName}
                                <GoVerified className='text-blue-400 text-md'/>
                            </p>
                            <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                {post.postedBy.userName}
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

        <div className='lg:ml-20 flex gap-5 relative'>
            <div 
                onMouseEnter={() => setIshover(true)}
                onMouseLeave={() => setIshover(false)}
                className="rounded-3xl">
                <Link href={`/detail/${post._id}`}>
                    <video 
                        loop
                        ref={videoRef}
                        className='lg:w-[600px] w-[200px] h-[300px] md:h-[400px] lg:h-[530px] rounded-xl cursor-pointer bg-gray-100 mb-10'
                        src={post.video.asset.url}
                    ></video>
                </Link>

                {isHover && (
                    <div className='absolute bottom-14 cursor-pointer left-6 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
                        { playing ? (
                            <button onClick={onVideoPress}>
                                <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                            </button>
                        ) : (
                            <button onClick={onVideoPress}>
                                <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                            </button>
                        )}
                        { isVideoMuted ? (
                            <button onClick={() => setIsVideoMuted(false) }>
                                <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                            </button>
                        ) : (
                            <button onClick={() => setIsVideoMuted(true) }>
                                <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default VideoCard