import React, { useState, useEffect, useRef } from "react";
import styles from "./Profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ListGoal from "../ListGoal/ListGoal";
import { ToastContainer, toast } from "react-toastify";

import { authenticateToken } from "../../api/auth";
import { getUser, updateUser } from "../../api/user";
import { uploadImage } from "../../api/UploadFile";
import { IMG_URL } from "../../api/index";

import Color, { Palette } from "color-thief-react";

export default function Profile() {
  const { userId } = useParams();
  const [image, setImage] = useState("");
  const [userInfo, setUserInfo] = useState({
    id: userId,
    name: "",
    about: "",
    avartar: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: ""
  });
  const [data, setData] = useState({
    followers: [],
    following: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) navigate("/");
    async function fecthData() {
      const res = await getUser(userInfo.id);
      if (res.code === 200) {
        setData(res.data);
        setImage(res.data.userInfo.avatar);
        const socialLink = JSON.parse(res.data.userInfo.socialLink);
        setUserInfo({
          ...userInfo,
          name: res.data.name,
          about: res.data.userInfo.about,
          avartar: res.data.userInfo.avatar,
          facebook: socialLink.facebook,
          twitter: socialLink.twitter,
          instagram: socialLink.instagram,
          linkedin: socialLink.linkedin
        });
      }
    }
    fecthData().catch((err) => {
      console.log(err);
    });
  }, []);

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const imageRef = useRef(null);

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (fileObj) {
      async function upload() {
        const res = await uploadImage(fileObj);
        return res.data.url;
      }
      upload()
        .then(async (res) => {
          setImage(`${IMG_URL}${res}`);
          setUserInfo({
            ...userInfo,
            avartar: IMG_URL + res
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    event.target.value = null;
  };

  const [mode, setMode] = useState("view");
  function handleEditProfile() {
    authenticateToken()
      .then((res) => {
        if (res.code === 200) setMode(mode === "view" ? "edit" : "view");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [selectedSocial, setselectedSocial] = useState("");

  function handleUpdateInfo() {
    const user = {
      id: JSON.parse(localStorage.getItem("USER_INFO")).userId,
      name: userInfo.name,
      about: userInfo.about,
      avatar: userInfo.avartar,
      socialLink: JSON.stringify({
        facebook: userInfo.facebook,
        twitter: userInfo.twitter,
        instagram: userInfo.instagram,
        linkedin: userInfo.linkedin
      })
    };
    updateUser(user)
      .then((res) => {
        if (res.code === 200) {
          toast.success("Your information has been updated!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => {
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Header />
      <ToastContainer />
      <section className="profile-section">
        <div className="profile-container">
          <div className="profile">
            <div className="profile-bg">
              <i onClick={handleEditProfile}>
                <FontAwesomeIcon icon={faEllipsis} size="2xl" />
              </i>
            </div>
            <section className="container">
              <Color src={image} crossOrigin="anonymous" format="hex">
                {({ data, loading }) => {
                  return (
                    <>
                      <div
                        ref={imageRef}
                        className="profile-image"
                        style={
                          image
                            ? {
                                backgroundImage: `url(${image})`,
                                backgroundColor: "unset",
                                boxShadow: `0 30px 50px -20px ${data}`
                              }
                            : {}
                        }
                      >
                        <input
                          style={{ display: "none" }}
                          ref={inputRef}
                          type="file"
                          onChange={handleFileChange}
                        />
                        {mode === "edit" ? (
                          <div
                            className="camera"
                            style={{ marginBottom: "-5px" }}
                            onClick={handleClick}
                          >
                            <FontAwesomeIcon icon={faCamera} />
                          </div>
                        ) : null}
                      </div>
                    </>
                  );
                }}
              </Color>

              <section className="profile-info">
                {mode === "edit" ? (
                  <input
                    className="profile-input"
                    type="text"
                    style={{ marginBottom: "10px" }}
                    defaultValue={data.name}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        name: e.target.value
                      });
                    }}
                  />
                ) : null}

                {data.name && mode === "view" ? (
                  <>
                    <h1 className="first-name">{data.name.split(" ")[0]}</h1>
                    <h1 className="second-name">
                      {data.name
                        .split(" ")
                        .map((i, index) => (index != 0 ? i + " " : ""))}
                    </h1>
                  </>
                ) : null}

                <h2>ABOUT</h2>
                {mode === "edit" ? (
                  <textarea
                    rows={3}
                    cols={50}
                    defaultValue={data.userInfo ? data.userInfo.about : ""}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        about: e.target.value
                      });
                    }}
                  />
                ) : null}
                <p>
                  {mode === "view"
                    ? data.userInfo != null && data.userInfo.about
                      ? data.userInfo.about
                      : "Write down something here. So that people can know more about you."
                    : null}
                </p>

                {mode === "edit" ? (
                  <>
                    <aside className="social-media-icons">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        id="twitter"
                        onClick={() => setselectedSocial("twitter")}
                      />
                      <FontAwesomeIcon
                        icon={faFacebook}
                        id="facebook"
                        onClick={() => setselectedSocial("facebook")}
                      />
                      <FontAwesomeIcon
                        icon={faInstagram}
                        id="instagram"
                        onClick={() => setselectedSocial("instagram")}
                      />
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        id="linkedin"
                        onClick={() => setselectedSocial("linkedin")}
                      />
                    </aside>

                    <input
                      type={selectedSocial ? "text" : "hidden"}
                      className="url-input"
                      placeholder={`Paste your ${selectedSocial} link here`}
                      defaultValue={userInfo[selectedSocial]}
                      onKeyDown={(e) => {
                        console.log(userInfo.selectedSocial);
                        if (e.key === "Enter") {
                          setUserInfo({
                            ...userInfo,
                            [selectedSocial]: e.target.value
                          });
                          e.target.value = "";
                          setselectedSocial("");
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <aside className="social-media-icons">
                      <Link
                        to={data.userInfo ? "http://" + userInfo.twitter : ""}
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </Link>
                      <Link
                        to={data.userInfo ? "http://" + userInfo.facebook : ""}
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </Link>
                      <Link
                        to={data.userInfo ? "http://" + userInfo.instagram : ""}
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </Link>
                      <Link
                        to={data.userInfo ? "http://" + userInfo.linkedin : ""}
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </Link>
                    </aside>
                  </>
                )}
              </section>
            </section>
            <section className="statistics">
              {mode === "view" ? (
                <>
                  <p>
                    <strong>{data.followers.length}</strong> Followers
                  </p>
                  <p>
                    <strong>{data.following.length}</strong> Following
                  </p>
                  <p>
                    <strong>6</strong> Course
                  </p>
                </>
              ) : (
                <>
                  <button onClick={handleUpdateInfo}>Update</button>
                </>
              )}
            </section>
          </div>
        </div>
        <ListGoal userId={userId} mode={mode} />
      </section>
      <Footer />
    </>
  );
}
