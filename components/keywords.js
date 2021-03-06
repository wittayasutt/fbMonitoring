import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { connect } from 'react-redux'

import forEach from 'lodash/forEach'

const Wrapper = styled.div`
	background: #ffffff;
	border: 1px solid #eaeaea;
	border-radius: ${props => props.radius};
	padding-bottom: 24px;

	@media screen and (max-width: 768px) {
		display: none;
	}
`

const Zone = styled.div``

const Top = styled.div`
	display: flex;
	flex-direction: row;
	margin: 18px 16px;
`

const TopLeft = styled.div`
	flex: 1;

	i {
		margin-right: 8px;
	}
`

const TopRight = styled.div``

const Sort = styled.div`
	height: 24px;
	width: 72px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 11px;
	color: #6d6b77;
	border: 1px solid #f2f1f1;
	border-radius: 3px;
	transition: 0.2s;
	cursor: pointer;

	:hover {
		color: #ffffff;
		background: ${props => props.accent};
		border: 1px solid ${props => props.accent};
	}
`

const Menu = styled.ul`
	li {
		height: 40px;
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 16px;
		transition: 0.1s;
		cursor: pointer;

		:hover {
			background: rgba(26, 186, 237, 0.1);
			border-right: 3px solid ${props => props.accent};
		}
	}
`

const Text = styled.div`
	flex: 1;
`

const Noti = styled.div`
	color: ${props => props.accent};
	margin-right: 16px;
`

const More = styled.div`
	height: 26px;
	width: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 40px auto auto;
	font-size: 12px;
	border: 1px solid #f2f1f1;
	border-radius: 50px;
	transition: 0.2s;
	cursor: pointer;

	:hover {
		color: #ffffff;
		background: ${props => props.accent};
		border: 1px solid ${props => props.accent};
	}
`

const Divide = styled.div`
	height: 1px;
	width: 218px;
	background: #f2f1f1;
	margin: 24px auto;
`

class Keywords extends Component {
	constructor(props, context) {
		super(props, context)
	}

	render() {
		const { theme, keywords, groups } = this.props
		let allUnreadKeywords = 0
		forEach(keywords, value => (allUnreadKeywords += value.unread || 0))

		return (
			<Wrapper radius={theme.radius}>
				<Zone>
					<Top>
						<TopLeft>Keywords ({keywords.length})</TopLeft>
						<TopRight>
							<Sort accent={theme.accent}>เรียงตามชื่อ</Sort>
						</TopRight>
					</Top>
					<Menu accent={theme.accent}>
						<li>
							<Text>ทั้งหมด</Text>
							<Noti accent={theme.accent}>{allUnreadKeywords}</Noti>
						</li>
						{keywords &&
							keywords.map((value, index) => (
								<li key={index}>
									<Text>{value.keyword}</Text>
									<Noti accent={theme.accent}>{value.unread || 0}</Noti>
								</li>
							))}
					</Menu>
					<More accent={theme.accent}>ดูทั้งหมด</More>
				</Zone>
				<Divide />
				<Zone>
					<Top>
						<TopLeft>Group ({groups.length})</TopLeft>
					</Top>
					<Menu accent={theme.accent}>
						{groups &&
							groups.map((value, index) => (
								<li key={index}>
									<Text>{value.title}</Text>
									<Noti accent={theme.accent}>{value.unread || 0}</Noti>
								</li>
							))}
					</Menu>
					<More accent={theme.accent}>ดูทั้งหมด</More>
				</Zone>
			</Wrapper>
		)
	}
}

const mapStateToProps = ({ theme, keywords, groups }) => ({
	theme,
	keywords,
	groups
})

export default connect(mapStateToProps)(Keywords)
