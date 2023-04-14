import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchParkinglot } from "../common/api/api";
import { listData } from "../common/data/address";

export default function Map() {

    const [keyword, setKeyword] = useState("건대 술집");

    // const { data } = useQuery(["parkinglot"],
    //     () => fetchParkinglot("용봉동", "혼합"),
    //     {

    //     })



    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {

        window.kakao.maps.load(function () {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };

            const map = new kakao.maps.Map(container, options);

            const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

            const marker = new kakao.maps.Marker({
                position: markerPosition
            });

            marker.setMap(map);

            const geocoder = new kakao.maps.services.Geocoder();

            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            // 장소 검색 객체를 생성합니다
            const ps = new kakao.maps.services.Places();

            // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
            const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });


            // 키워드로 장소를 검색합니다
            searchPlaces();

            // 입력한 키워드로 검색한다.
            // var places = new kakao.maps.services.Places();

            // var callback = function (result, status) {
            //     if (status === kakao.maps.services.Status.OK) {
            //         console.log(result);
            //     }
            // };

            // places.keywordSearch('판교 치킨', callback);

            // 키워드 검색을 요청하는 함수입니다
            function searchPlaces() {


                // if (!keyword.replace(/^\s+|\s+$/g, '')) {
                //     alert('키워드를 입력해주세요!');
                //     return false;
                // }

                // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
                ps.keywordSearch(keyword, placesSearchCB);
            }

            listData?.map((address) => {
                geocoder.addressSearch(address.groupAddress, function (result, status) {

                    // 정상적으로 검색이 완료됐으면 
                    if (status === kakao.maps.services.Status.OK) {

                        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        const marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        const infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">냠냠</div>'
                        });
                        infowindow.open(map, marker);


                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            })
        })
    }




    const onChangeInput = (event) => {

        setKeyword(event.tartget?.value)
    }

    return (
        <div>
            <div id="map" style={{ width: "500px", height: "400px" }}></div>

            <div>
                <form onSubmit={searchPlaces}>
                    키워드 : <input type="text" onChange={onChangeInput} value={keyword} />
                    <button type="submit">검색하기</button>
                </form>
            </div>
        </div>
    )
}


