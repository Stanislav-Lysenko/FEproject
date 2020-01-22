class Registration{
	constructor(users){
		this.storage = new Storage();
		this.users = users;
		this.emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
		this.passRegExp = /^\w{6,}$/;
		this.nameRegExp= /^[a-zа-яё]{3,}$/i;
		this.init();
	}

	async init(){
		await this.storage.init();
		this.findNodes();
		this.bindAll();
		this.addEvents();

	}

	findNodes(){
		this.nodes = {
			form: document.forms.registration,
			email: document.forms.registration.elements.email,
			name: document.forms.registration.elements.name,
			pass0: document.forms.registration.elements.pass[0],
			pass1: document.forms.registration.elements.pass[1],
			submit: document.forms.registration.elements.submit,
			warning: document.getElementsByClassName('registration__warning')[0]
		}
		console.dir(this.nodes);
	}

	addEvents() {
		this.nodes.submit.addEventListener('click', this.submitForm)
	}

	bindAll() {
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e){
		e.preventDefault();
		let flag = true;
		this.nodes.warning.innerHTML = '';
		//check valid email
		if (!this.emailRegExp.test(this.nodes.email.value)) {
			this.createWarningMessage('email');
			flag = false;
		}
		//check valid passward
		if (!this.passRegExp.test(this.nodes.pass0.value) || !this.passRegExp.test(this.nodes.pass1.value)) {
			this.createWarningMessage('password');
			flag = false;
		}
		//chek valid name
		if (!this.nameRegExp.test(this.nodes.name.value)) {
			this.createWarningMessage('name');
			flag = false;
		}
		if (!flag){
			return;
		} else if (this.findUser(this.nodes.email.value)) {
			this.addNewUserToLocalStorage(this.createUser());
			this.createWarningMessage('ok');
		} else {
			this.createWarningMessage('exist');
		}
	}

	createUser(){
		let	newUser = {
			login: this.nodes.email.value,
			name: this.nodes.name.value,
			password: this.nodes.pass0.value,
			buyitems: [],
			sellitems: []
		}
		return newUser;
	}

	addNewUserToLocalStorage(user){
		this.storage.addNewUsertoTempStorage(user)
	}

	findUser(login){
		let user = this.users.find(user => user.login === login);
		if (user) {
			//this user is exist
			return false;
		} else {
			// this user doesn't exist - go on registration
			return true;
		}
	}

	createWarningMessage(errorname){
		let message = document.createElement('p');
		switch (errorname){
			case 'email':
				message.append(document.createTextNode('You entered incorrect email'));
			break;
			case 'password':
				message.append(document.createTextNode('You entered incorrect pass: 6 lettes or numers or _ or they are not equal each other'));
			break;
			case 'name':
				message.append(document.createTextNode('You enterd incorrect name: only letters and min size=3'));
			break;
			case 'exist':
				message.append(document.createTextNode('This user have been existed'));
			break;
			case 'ok':
				message.append(document.createTextNode(`You've been just registered. Sign in!`));
			break;
			default: console.log('incorrect error name');
		}
		this.nodes.warning.appendChild(message);
	}
 }