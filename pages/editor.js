import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Cropper from "react-cropper";
import Link from "next/link";
import {
  Icon,
  Button,
  Select,
  Accordion,
  InputGroup,
  Input,
  InputRightAddon,
  useMediaQuery,
} from "@chakra-ui/react";

import {
  ContentWrapper,
  ImageSelector,
  ActionButton,
  AccordionSection,
  AlertMessage,
  CheckBox,
  CropScore,
  CropReset,
  PresetsToggleBar,
  DescriptionCard,
} from "../components";

import ImageReset from "../components/ImageReset";

import * as Hi from "react-icons/hi";
import * as Fi from "react-icons/fi";
import * as Bs from "react-icons/bs";
import * as Ri from "react-icons/ri";
import * as Fa from "react-icons/fa";

import "cropperjs/dist/cropper.css";
import styles from "../styles/Home.module.css";

import { presets } from "../data/presets.js";

export default function Home() {
  const site = Object.keys(presets[0])[0];
  const { name, description, height, width } = presets[0][site][0];

  const [activePreset, setActivePreset] = useState({
    site,
    name,
    description,
    height,
    width,
  });
  const [cropper, setCropper] = useState();
  const [image, setImage] = useState();
  const [baseImage, setBaseImage] = useState();
  const [fileName, setFileName] = useState();
  const [fileType, setFileType] = useState("jpg");
  const [dragArea, setDragArea] = useState({
    width,
    height,
  });
  const [customResolutionError, setCustomResolutionError] = useState("");
  const [customRatioLock, setCustomRatioLock] = useState(false);
  const [presetBarVisible, setPresetBarVisible] = useState(false);
  const [isTablet] = useMediaQuery("(max-width: 1020px)");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (cropper) {
      const x = cropper.getData().x;
      customRatioLock
        ? cropper.setAspectRatio(dragArea.width / dragArea.height)
        : cropper.setAspectRatio(NaN);
      cropper.setData({ width: dragArea.width, height: dragArea.height, x, y });
    }
  }, [customRatioLock]);

  const calcCustomRes = (res) =>
    res < 720 ? "SD" : res < 1920 ? "HD" : res < 3840 ? "FHD" : "UHD";

  const getFileName = (file) => file.substr(0, file.lastIndexOf(".")) || x;

  const croppedInfo = `${styles.croppedInfo} dark:text-white text-nft-black-1`;

  const cropperRef = useRef(null);
  const onCrop = () => {
    let cropper = cropperRef.current.cropper;
    setDragArea({
      ...dragArea,
      width: cropper.getCroppedCanvas().width,
      height: cropper.getCroppedCanvas().height,
    });

    setX(cropper.getData().x);
    setY(cropper.getData().y);

    setBaseImage(cropper.getCroppedCanvas().toDataURL());
  };

  const onCropMove = () => {
    if (cropper) {
      setX(cropper.getData().x);
      setY(cropper.getData().y);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.target) {
      files = e.target.files;
      setFileName(getFileName(e.target.files[0].name));
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const zoomIn = () => cropper.zoom(0.1);
  const zoomOut = () => cropper.zoom(-0.1);
  const moveLeft = () => cropper.move(-10, 0);
  const moveRight = () => cropper.move(10, 0);
  const moveUp = () => cropper.move(0, -10);
  const moveDown = () => cropper.move(0, 10);
  const rotateLeft = () => cropper.rotate(-45);
  const rotateRight = () => cropper.rotate(45);
  const swapX = () =>
    cropper.getData().scaleX === 1 ? cropper.scaleX(-1) : cropper.scaleX(1);
  const swapY = () =>
    cropper.getData().scaleY === 1 ? cropper.scaleY(-1) : cropper.scaleY(1);
  const reset = () => cropper.reset();

  const heroTitle = `${styles.heroTitle} dark:text-white text-nft-black-1`;
  const heroSubTitle = `${styles.heroSubTitle} dark:text-white text-nft-black-1`;
  const descriptionBox = `${styles.descriptionBox} dark:text-white text-nft-black-1`;

  return (
    <div>
      <Head>
        <title>Editor</title>
      </Head>
      {!image ? (
        <ContentWrapper>
          <div className={styles.heroArea}>
            <h1 className={heroTitle}>
              An NFT image editor for content creators
            </h1>
            <p className={heroSubTitle}>
              Resolutions and aspect ratios should be the last things you worry
              about
            </p>

            <div className={styles.heroSelect}>
              <div className={styles.heroDescriptionArea}>
                <DescriptionCard
                  image="/graphics/close.png"
                  description="Say goodbye to squeezed, stretched and pixelated images..."
                />
                <DescriptionCard
                  image="/graphics/close.png"
                  description="Stop spending time trying to figure out resolutions
                  and aspect ratios..."
                />
                <DescriptionCard
                  image="/graphics/close.png"
                  description="Avoid using multiple tools and creating templates for each media type..."
                />
                <DescriptionCard
                  image="/graphics/check.png"
                  description="Let NFTKastle sort it all out for you!"
                />
              </div>
              <div className={styles.imageSelectorArea}>
                <ImageSelector onChange={onChange} />
              </div>
            </div>
          </div>
        </ContentWrapper>
      ) : (
        <div className={styles.creatorArea}>
          <PresetsToggleBar
            onClick={() => {
              setPresetBarVisible(!presetBarVisible);
            }}
            active={presetBarVisible}
            color={presetBarVisible ? "red" : "gray"}
            openIcon={Fa.FaArrowDown}
            closeIcon={Fa.FaArrowUp}
            isTablet={isTablet}
          />
          <div
            className={styles.presetsArea}
            style={{
              display: `${
                (presetBarVisible && isTablet) || !isTablet ? "block" : "none"
              }`,
            }}
          >
            <Accordion defaultIndex={[0]} allowToggle>
              {presets.map((site, i) => {
                return (
                  <AccordionSection key={i} title={Object.keys(site)}>
                    {site[Object.keys(site)].map((param, index) => {
                      return (
                        <CheckBox
                          key={index}
                          index={!i && !index}
                          title={param.name}
                          isChecked={
                            activePreset.site
                              ? activePreset.site.toString() ==
                                  Object.keys(site).toString() &&
                                activePreset.name == param.name
                              : false
                          }
                          onChange={(e) => {
                            setPresetBarVisible(false);
                            if (e.target.checked) {
                              setCustomRatioLock(false);
                              setActivePreset({
                                ...activePreset,
                                site: Object.keys(site),
                                name: param.name,
                                description: param.description,
                                height: param.height,
                                width: param.width,
                              });
                              cropper.setAspectRatio(
                                param.width / param.height
                              );
                            } else {
                              setActivePreset({});
                              cropper.setAspectRatio(NaN);
                              cropper.setData({
                                width: dragArea.width,
                                height: dragArea.height,
                                x,
                                y,
                              });
                            }
                          }}
                        />
                      );
                    })}
                  </AccordionSection>
                );
              })}
              <AccordionSection title="Custom size">
                <h1>Set resolution / aspect ratio:</h1>
                <div className={styles.customInput}>
                  <InputGroup>
                    <Input
                      placeholder={dragArea.width}
                      value={dragArea.width || ""}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        const previousValue =
                          Number(value.toString().slice(0, -1)) || 0;
                        const containerWidth = cropper.getContainerData().width;
                        const naturalImageWidth =
                          cropper.getImageData().naturalWidth;
                        const canvasWidth = cropper.getCanvasData().width;

                        if (canvasWidth > containerWidth) {
                          const maxCropperWidth = Math.round(
                            containerWidth / (canvasWidth / naturalImageWidth)
                          );
                          if (value <= maxCropperWidth) {
                            if (activePreset.name) {
                              setActivePreset({});
                              cropper.setAspectRatio(NaN);
                            }
                            cropper.setData({ width: value, x, y });

                            setCustomResolutionError("");
                          } else {
                            setCustomResolutionError(
                              `The max width is ${maxCropperWidth}px`
                            );
                            e.target.value = previousValue;
                            cropper.setData({
                              width: previousValue,
                              x,
                              y,
                            });
                            setTimeout(() => {
                              setCustomResolutionError("");
                            }, 2000);
                          }
                        } else {
                          if (value <= naturalImageWidth) {
                            if (activePreset.name) {
                              setActivePreset({});
                              cropper.setAspectRatio(NaN);
                            }
                            cropper.setData({ width: value, x, y });
                            setCustomResolutionError("");
                          } else {
                            setCustomResolutionError(
                              `The max width is ${naturalImageWidth}px`
                            );
                            e.target.value = previousValue;
                            cropper.setData({
                              width: previousValue,
                              x,
                              y,
                            });
                            setTimeout(() => {
                              setCustomResolutionError("");
                            }, 2000);
                          }
                        }
                      }}
                      isDisabled={customRatioLock}
                      type="number"
                    />
                    <InputRightAddon children="px" />
                  </InputGroup>
                  <div style={{ display: "grid", placeItems: "center" }}>
                    <p>x</p>
                  </div>
                  <InputGroup>
                    <Input
                      placeholder={dragArea.height}
                      value={dragArea.height || ""}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        const previousValue =
                          Number(value.toString().slice(0, -1)) || 0;
                        const containerHeight =
                          cropper.getContainerData().height;
                        const naturalImageHeight =
                          cropper.getImageData().naturalHeight;
                        const canvasHeight = cropper.getCanvasData().height;

                        if (canvasHeight > containerHeight) {
                          const maxCropperHeight = Math.round(
                            containerHeight /
                              (canvasHeight / naturalImageHeight)
                          );
                          if (value <= maxCropperHeight) {
                            if (activePreset.name) {
                              setActivePreset({});
                              cropper.setAspectRatio(NaN);
                            }
                            cropper.setData({ height: value, x, y });
                            setCustomResolutionError("");
                          } else {
                            setCustomResolutionError(
                              `The max height is ${maxCropperHeight}px`
                            );
                            e.target.value = previousValue;
                            cropper.setData({
                              height: previousValue,
                              x,
                              y,
                            });
                            setTimeout(() => {
                              setCustomResolutionError("");
                            }, 2000);
                          }
                        } else {
                          if (value <= naturalImageHeight) {
                            if (activePreset.name) {
                              setActivePreset({});
                              cropper.setAspectRatio(NaN);
                            }
                            cropper.setData({ height: value, x, y });
                            setCustomResolutionError("");
                          } else {
                            setCustomResolutionError(
                              `The max height is ${naturalImageHeight}px`
                            );
                            e.target.value = previousValue;
                            cropper.setData({
                              height: previousValue,
                              x,
                              y,
                            });
                            setTimeout(() => {
                              setCustomResolutionError("");
                            }, 2000);
                          }
                        }
                      }}
                      isDisabled={customRatioLock}
                      type="number"
                    />
                    <InputRightAddon children="px" />
                  </InputGroup>
                </div>
                {customResolutionError && (
                  <AlertMessage message={customResolutionError} />
                )}

                <Button
                  onClick={() => {
                    setCustomRatioLock(!customRatioLock);
                    setActivePreset({});
                    setX(cropper.getData().x);
                    setY(cropper.getData().y);
                  }}
                  leftIcon={
                    customRatioLock ? (
                      <Icon as={Fi.FiLock} w={5} h={5} />
                    ) : (
                      <Icon as={Fi.FiUnlock} w={5} h={5} />
                    )
                  }
                  colorScheme="teal"
                  variant="solid"
                >
                  {customRatioLock ? "Locked In" : "Lock In"}
                </Button>
              </AccordionSection>
            </Accordion>
          </div>

          <div className={styles.cropperArea}>
            <Cropper
              src={image}
              style={{ height: "480px", width: "100%" }}
              aspectRatio={width / height}
              guides={true}
              preview=".preview"
              crop={onCrop}
              cropmove={onCropMove}
              ref={cropperRef}
              viewMode={2}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <div className={styles.controls}>
              <ActionButton
                onClick={() => {
                  cropper.setDragMode("crop");
                }}
                icon={Fi.FiCrop}
                color="blue"
                title=" Draw crop"
              />

              <div style={{ display: "grid", gap: "10px" }}>
                <ActionButton
                  onClick={zoomIn}
                  icon={Ri.RiZoomInLine}
                  color="blue"
                  title="Zoom in"
                />
                <ActionButton
                  onClick={zoomOut}
                  icon={Ri.RiZoomOutLine}
                  color="blue"
                  title="Zoom out"
                />
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                <ActionButton
                  onClick={moveLeft}
                  icon={Fa.FaArrowLeft}
                  color="blue"
                  title="Move left"
                />
                <ActionButton
                  onClick={moveRight}
                  icon={Fa.FaArrowRight}
                  color="blue"
                  title="Move right"
                />
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                <ActionButton
                  onClick={moveUp}
                  icon={Fa.FaArrowUp}
                  color="blue"
                  title="Move up"
                />
                <ActionButton
                  onClick={moveDown}
                  icon={Fa.FaArrowDown}
                  color="blue"
                  title="Move Down"
                />
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                <ActionButton
                  onClick={rotateLeft}
                  icon={Fi.FiRotateCcw}
                  color="blue"
                  title="Rotate left"
                />
                <ActionButton
                  onClick={rotateRight}
                  icon={Fi.FiRotateCw}
                  color="blue"
                  title="Rotate right"
                />
              </div>
              <div style={{ display: "grid", gap: "10px" }}>
                <ActionButton
                  onClick={swapX}
                  icon={Fa.FaArrowsAltH}
                  color="blue"
                  title="Flip X axis"
                />
                <ActionButton
                  onClick={swapY}
                  icon={Fa.FaArrowsAltV}
                  color="blue"
                  title="Flip Y axis"
                />
              </div>
              <ActionButton
                onClick={() => {
                  cropper.setDragMode("move");
                }}
                icon={Bs.BsArrowsMove}
                color="blue"
                title="Move image"
              />
            </div>

            <div className={styles.resets}>
              <ImageReset onChange={onChange} />
              <CropReset onClick={reset} />
            </div>
          </div>

          <div className={styles.toolsArea}>
            <div className={styles.titleBox}>
              {activePreset.site ? (
                <h1 className={styles.sectionTitle}>
                  {activePreset.site} {activePreset.name}:
                </h1>
              ) : (
                <h1 className={styles.sectionTitle}>
                  {!customRatioLock
                    ? "Custom Resolution"
                    : "Locked Aspect Ratio"}
                  :
                </h1>
              )}
            </div>
            <div className={descriptionBox}>
              {activePreset.site ? (
                <p>{activePreset.description}</p>
              ) : (
                <p>
                  {!customRatioLock
                    ? "Draw any crop area you want"
                    : "Draw any crop within aspect ratio"}
                </p>
              )}
            </div>

            <div className={styles.titleBox}>
              {activePreset.site ? (
                <h1 className={styles.sectionTitle}>Fit for Target Use:</h1>
              ) : (
                <h1 className={styles.sectionTitle}>Crop Window Data:</h1>
              )}
            </div>

            <div className={croppedInfo}>
              <div style={{ display: "grid", placeItems: "center" }}>
                <div>
                  <h1 className={styles.croppedRes}>{dragArea.width}</h1>
                  <p>Width</p>
                </div>
              </div>
              <div style={{ display: "grid", placeItems: "center" }}>
                <h1>X</h1>
              </div>
              <div style={{ display: "grid", placeItems: "center" }}>
                <div>
                  <h1 className={styles.croppedRes}>{dragArea.height}</h1>
                  <p>Height</p>
                </div>
              </div>
              <div>
                {activePreset.width ? (
                  <CropScore
                    score={
                      Math.round((dragArea.width * 100) / activePreset.width) >
                      100
                        ? "100+"
                        : Math.round(
                            (dragArea.width * 100) / activePreset.width
                          )
                    }
                    value={Math.round(
                      (dragArea.width * 100) / activePreset.width
                    )}
                  />
                ) : (
                  <div>
                    <p>Res.score</p>
                    <h1 className={styles.croppedRes}>
                      {!dragArea.width || !dragArea.height
                        ? "-"
                        : calcCustomRes(Math.round(dragArea.width))}
                    </h1>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.titleBox}>
              <h1 className={styles.sectionTitle}>Image Preview:</h1>
            </div>
            <div>
              <div
                className="preview"
                style={{
                  height: "200px",
                  overflow: "hidden",
                  position: "relative",
                  marginBottom: "20px",
                  margin: "0 auto 20px auto",
                  display: `${
                    dragArea.width == 0 || dragArea.height == 0
                      ? "none"
                      : "block"
                  }`,
                }}
              ></div>
            </div>
            {(dragArea.width == 0 || dragArea.height == 0) && (
              <div className={styles.descriptionBox}>
                <p>Preview not available.</p>
                <p>
                  Please set{" "}
                  {dragArea.width == 0 && dragArea.height == 0
                    ? "width and height"
                    : dragArea.width == 0
                    ? "width"
                    : "height"}
                  .
                </p>
              </div>
            )}
            <div className={styles.downloadArea}>
              <Link
                href={{
                  pathname: "/mint-nft",
                  query: {
                    baseImage: baseImage,
                    downloadLink: `${fileName}-cropped.${fileType}`,
                  },
                }}
              >
                <Button
                  rightIcon={<Icon as={Hi.HiDownload} w={5} h={5} />}
                  colorScheme="teal"
                  variant="solid"
                  isDisabled={!dragArea.width || !dragArea.height}
                  w="100%"
                >
                  Mint 🎉
                </Button>
              </Link>
              <Select
                className="dark:text-white text-nft-black-1"
                onChange={(e) => {
                  setFileType(e.target.value);
                }}
                isDisabled={!dragArea.width || !dragArea.height}
              >
                <option className="text-nft-black-1" value="jpg">
                  .JPG
                </option>
                <option className="text-nft-black-1" value="png">
                  .PNG
                </option>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
