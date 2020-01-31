<?php

class User
{
	public function inital($method)
	{
		switch ($method) {
			case 'new':
				$this->newUser();
				break;

			default:
				# code...
				break;
		}
	}

	private function newUser()
	{
	}
}
