import React from 'react';
import Rectangle from '../../general/Rectangle';
import Heading from '../../general/Heading';

function SingleBot() {
    return (
      	<>
			<div className='wrapper pb-20 font-causten'>
				<div className='flex items-center space-x-5 mb-10'>
					<Rectangle />
					<Heading text="Product Description" />
				</div>
				<div className='flex w-full'>
					<div className='w-1/2 space-y-10 mt-7'>
						<div className='flex space-x-8'>
							<div className=''>
								<p className='text-[16px] text-[#3C4242] font-semibold'>Description</p>
								<div className='border-b-[3px] rounded-[1px] border-[#3C4242]  w-[50px] pb-3'></div>
							</div>
							<div className='flex space-x-3'>
								<p className='text-[16px] font-normal text-[#807D7E]'>User Comments</p>
								<p className='w-[24px] h-[24px] bg-[#8A33Fd] text-white flex items-center justify-center rounded-lg text-[12px]'>21</p>
							</div>
							<div className='flex space-x-3'>
								<p className='text-[16px] font-normal text-[#807D7E]'>Question & Answer</p>
								<p className='w-[24px] h-[24px] bg-[#8A33Fd] text-white flex items-center justify-center rounded-lg text-[12px]'>21</p>
							</div>							
						</div>
						<div>
							<p className='text-[16px] text-[#807D7E]'>100% Bio-washed Cotton - makes the fabric extra soft & silky. Flexible ribbed crew neck. Precisely stitched with no pilling & no fading. Provide  all-time comfort. Anytime, anywhere. Infinite range of matte-finish HD prints.</p>
						</div>
					</div>
					<div className='w-1/2 flex'>
						<div className='border-r border-r-[#BEBCBD] w-1/3 space-y-4 '>
							<div className='ml-10'>
								<p className='text-[16px] text-[#807D7E] pb-4'>Fabric</p>
								<p className='text-[16px] font-medium leading-[16px] pb-2'>Bio-Washed Cotton</p>
							</div>
							<div className='border-b border-b-[#BEBCBD]'></div>
							<div className='ml-10'>
								<p className='text-[16px] text-[#807D7E] pb-4'>Neck</p>
								<p className='text-[16px] font-medium leading-[16px]'>Round Neck</p>
							</div>
						</div>
						<div className='border-r border-r-[#BEBCBD] w-1/3 space-y-4'>
							<div className='ml-10'>
								<p className='text-[16px] text-[#807D7E] pb-4'>Pattern</p>
								<p className='text-[16px] font-medium leading-[16px] pb-2'>Printed</p>
							</div>
							<div className='border-b border-b-[#BEBCBD]'></div>
							<div className='ml-10'>
								<p className='text-[16px] text-[#807D7E] pb-4'>Sleeve</p>
								<p className='text-[16px] font-medium leading-[16px]'>Half-sleeves</p>
							</div>
						</div>
						<div className='w-1/3 space-y-4'>
							<div className='ml-10'>
								<p className='text-[16px] text-[#807D7E] pb-4'>Fit</p>
								<p className='text-[16px] font-medium leading-[16px] pb-2'>Regular-fit</p>
							</div>
							<div className='border-b border-b-[#BEBCBD]'></div>
							<div className='ml-10'>
								<p className='text-[16px] text-[#807D7E] pb-5'>Style</p>
								<p className='text-[16px] font-medium leading-[16px]'>Casual Wear</p>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-10'>
					<div className='flex items-center space-x-5 mb-10'>
						<Rectangle />
						<Heading text="Similar Products" />
					</div>
				</div>
			</div>
		</>
    )
}

export default SingleBot