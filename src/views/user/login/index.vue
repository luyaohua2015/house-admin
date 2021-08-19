<template>
	<div class="login-container main">
		<a-form id="formLogin" class="user-layout-login" ref="formRef" :rules="rules[customActiveKey]" :model="form">
			<a-tabs
				v-model:activeKey="customActiveKey"
				:tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
				@change="handleTabClick"
			>
				<a-tab-pane key="tab1" tab="账户密码登录">
					<a-form-item name="username">
						<a-input placeholder="账户" size="large" v-model:value="form.username">
							<template #prefix>
								<UserOutlined />
							</template>
						</a-input>
					</a-form-item>

					<a-form-item name="password">
						<a-input placeholder="密码" size="large" v-model:value="form.password">
							<template #prefix>
								<LockOutlined />
							</template>
						</a-input>
					</a-form-item>
				</a-tab-pane>
				<a-tab-pane key="tab2" tab="手机号登录">
					<a-form-item name="phone">
						<a-input placeholder="手机号" size="large" v-model:value="form.phone">
							<template #prefix>
								<PhoneOutlined />
							</template>
						</a-input>
					</a-form-item>

					<a-row :gutter="16">
						<a-col class="gutter-row" :span="16">
							<a-form-item name="code">
								<a-input placeholder="验证码" size="large" v-model:value="form.code">
									<template #prefix>
										<MailOutlined />
									</template>
								</a-input>
							</a-form-item>
						</a-col>
						<a-col class="gutter-row" :span="8">
							<a-button size="large"> 获取验证码 </a-button>
						</a-col>
					</a-row>
				</a-tab-pane>
			</a-tabs>
			<a-form-item style="margin-top: 24px">
				<a-button type="primary" @click="handleSubmit" size="large" block>登录</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { timeFix } from '@/utils/util'
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons-vue'
export default defineComponent({
	setup() {
		const form = reactive({
			username: '',
			password: '',
			phone: '',
			code: '',
		})

		const rules = {
			tab1: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: 'blur',
					},
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
					},
				],
			},
			tab2: {
				phone: [
					{
						required: true,
						message: '请输入手机号',
						trigger: 'blur',
					},
				],
				code: [
					{
						required: true,
						message: '请输入验证码',
						trigger: 'blur',
					},
				],
			},
		}

		const formRef = ref()
   /**
   * 切换登录清空表单验证
   * @author 陆耀华
   * @date 2021-08-19
   * @returns {any}
   */
		const handleTabClick = () => {
			formRef.value.resetFields()
		}

		return {
			handleTabClick,
			customActiveKey: ref('tab1'),
			form,
			rules,
			formRef,
		}
	},
  methods: {
    /**
   * 登录事件
   * @author 陆耀华
   * @date 2021-08-19
   * @returns {any}
   */
		handleSubmit() {
			this.formRef
				.validate()
				.then(() => {
          this.$store.dispatch('user/login', toRaw(this.form)).then((res) => this.loginSuccess(res))
				})
				.catch((error) => {
					console.log('error', error)
				})
		},
    loginSuccess(res) {
      console.log(res)
      this.$router.push({
        path: '/'
      })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        console.log(this)
        // notification.success({
        //   message: '欢迎',
        //   description: `${timeFix()}，欢迎回来`
        // })
      }, 1000)
    }
  },
	components: {
		UserOutlined,
		LockOutlined,
		PhoneOutlined,
		MailOutlined,
	},
})
</script>
<style lang="less" scope></style>
