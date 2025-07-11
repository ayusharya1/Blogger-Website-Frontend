import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { baseUrl, get } from "../services/EndPoint";
import toast from "react-hot-toast";
function RecentPost() {
    const navigate = useNavigate()
    const handlenavigate = async(id) => {
        navigate(`/post/${id}`)
        
    }
    const [post, setpost] = useState([])
    const getPost = async () => {
        try {
            const response = await get("/blog/getposts")
            const data = response.data
            // console.log(data);
            setpost(data)

        } catch (error) {
            console.log(error);

        }
    }
    // console.log(post);

    //useEffect mein api ko fetch karenge
    useEffect(() => {
        getPost()
    }, [])
    return (
        <>
            <div className="w-100% pr-[12px] pl-[12px] mr-auto ml-auto max-w-100% mt-5">
                <div className="mb-6 text-center mt-1">
                    <h2 className="font-bold text-5xl text-white">Recent Posts</h2>
                </div>
                <div className="flex flex-wrap justify-start gap-20">
                    {post && post.map((item, index) => (
                        <div key={index} className="w-full mb-2 ml-16 mr-16 md:w-1/3 lg:w-1/3">
                            <div
                                className="bg-white shadow rounded-lg border-green-500 mr-[15px] h-[32rem] relative"
                                style={{
                                    borderWidth: "2px",
                                    backgroundColor: "#111827",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }}
                            >
                                <img
                                    className="w-[100%] object-cover rounded-t-lg"
                                    src={`${baseUrl}/images/${item.postimage}`}
                                    alt=""
                                />
                                <div className="bg-gray-900 text-white p-4 ">
                                    <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
                                    <p className="text-sm text-gray-300">  {typeof item.description === "string"
    ? item.description.length > 150
      ? index === 0
        ? `${item.description.slice(0, 200)}...`
        : `${item.description.slice(0, 150)}...`
      : item.description
    : "No description available"}</p>
                                    <button onClick={() => handlenavigate(item._id)} className="py-2 px-4 rounded font-semibold bg-blue-600 hover:bg-blue-700 text-white w-[90%] bottom-5  absolute">
                                        Read Article
                                    </button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
}

export default RecentPost;
