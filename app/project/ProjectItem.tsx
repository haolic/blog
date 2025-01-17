"use client";
import { motion } from "motion/react";
import Link from "next/link";

interface ProjectItemProps {
  index: number;
}

export default function ProjectItem(props: ProjectItemProps) {
  const { index } = props;
  return (
    <motion.div
      className="rounded-xl border bg-card text-card-foreground shadow p-6 w-full card-item [&.card-item:not(:first-child)]:mt-6 relative"
      initial={{ opacity: 0, left: index % 2 === 0 ? 10 : -5 }}
      animate={{ opacity: 1, left: 0 }}
    >
      <div className="flex gap-6">
        <div
          className="w-[188px] h-[270px] rounded-[5px] text-white flex flex-col justify-end p-3 pb-9"
          style={{
            background:
              "linear-gradient(180deg, #DB4E66 0%, #A24688 40%, #4E3ABA 100%)",
          }}
        >
          <div className="bg-white w-5 h-5 rounded-full" />
          <div className="text-2xl mt-4">
            <Link href="https://pc.diting.ai/" target="_blank">
              Diting区块链
            </Link>
          </div>
          <div className="text-xs mt-2">
            一个初期就日活用户2000+，峰值日活过万，的一个区块链监测平台。
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 justify-between">
          <div>
            <h4 className="text-lg font-bold">项目描述</h4>
            <div className="text-slate-500">
              跟踪大佬钱包地址，合约大户增减持通知。预警跑路，及时撤退。合约检测、发现貔貅、合约风险、费率过高、疑似诈骗项目，统统规避。
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold">技术栈</h4>
            <div className="text-slate-500">React</div>
          </div>
          <div>
            <h4 className="text-lg font-bold">成就</h4>
            <div className="text-slate-500">
              日活用户2000+，牛市峰值日活上万。
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
