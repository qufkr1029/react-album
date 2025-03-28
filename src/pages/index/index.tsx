import { useMemo, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { imageData } from '@/recoil/selectors/imageSelector'
import CommonHeader from '@/components/common/header/CommonHeader'
import CommonNav from '@/components/common/navigation/CommonNav'
import CommonSearchBar from '@/components/common/searchBar/CommonSearchBar'
import CommonFooter from '@/components/common/footer/CommonFooter'
import Card from './component/Card'
import DetailDialog from '@/components/common/dialog/DetailDialog'
// CSS
import styles from './styles/index.module.scss'
import { CardDTO } from './types/card'
import Loding from './component/Loding'


function index() {
    const imgSelector = useRecoilValueLoadable(imageData)
    const [imgData, setImgData] = useState<CardDTO>()
    const [open, setOpen] = useState<boolean>(false) // 이미지 상세 다이얼로그 발생(상태) state
        
    const CARD_LIST = useMemo(() => {
        if (imgSelector.state === 'hasValue') {
            const res = imgSelector.contents.results.map((card: CardDTO) => {
                return <Card data={card} key={card.id} handleDialog={setOpen} handleSetData={setImgData} />
            })
            return res
        } else {
            return <Loding />

        }
    }, [imgSelector])
    
    return (
        <div className={styles.page}>
            {/* 공통헤더 UI 부분 */}
            <CommonHeader />
            {/* 공통 네비게이션 UI 부분 */}
            <CommonNav />
            <div className={styles.page__contents}>
                <div className={styles.page__contents__introBox}>
                    <div className={styles.wrapper}>
                        <span className={styles.wrapper__title}>PunSplash</span>
                        <span className={styles.wrapper__desc}>
                            UnSplash 인터넷 시각 자료 출처입니다.<br />
                            모든 지역에 있는 크리에이터들의 지원을 받습니다.
                        </span>
                        {/* 검색할 UI 부분 */}
                        <CommonSearchBar />
                    </div>
                </div>
                <div className={styles.page__contents__imageBox}>
                    {CARD_LIST}
                </div>
            </div>
            {/* 공통 푸터 UI 부분 */}
            <CommonFooter />
            {open && <DetailDialog data={imgData} handleDialog={setOpen} />}
        </div>
    )
}

export default index