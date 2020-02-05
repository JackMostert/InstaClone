<?php

class GET extends Database
{
	private function getData($table, $returnType, $schema, $data, $conn)
	{

		switch ($schema) {
			case 'RequestConditional' && $returnType === "Count":
				$result = call_user_func($_ENV["PerparedSQL"]["GET_Conditional_Count"], $conn, $table, $data->field, $data->toSearch);
				break;
			case 'RequestConditional':
				$result = call_user_func($_ENV["PerparedSQL"]["GET_Conditional"], $conn, $table, $data->field, $data->toSearch);
				break;
			case 'RequestAll' && $returnType === "Count":
				$result = call_user_func($_ENV["PerparedSQL"]["GET_All_Count"], $conn, $table);
				break;
			case 'RequestAll':
				$result = call_user_func($_ENV["PerparedSQL"]["GET_All"], $conn, $table);
				break;
		}

		return $result;
	}

	public function start($table, $returnType, $schema, $data, $route, $Res, $conn, $JWT, $Validation)
	{
		$payload = array();

		switch ($route) {
			case '/Feed':
				$data = $this->getData($table, $returnType, $schema, $data, $conn);
				while ($rowData = $data->fetch_assoc()) {
					$internalData = new stdClass();

					$internalData->toSearch = $rowData['Post_ID'];
					$internalData->field = "Like_PostID";

					$likeCount 		= $this->getData('Likes', 'Count', 'RequestConditional', $internalData, $conn)->fetch_assoc()['total'];

					$internalData->field = "Comment_PostID";
					$commentCount = $this->getData('Comments', 'Count', 'RequestConditional', $internalData, $conn)->fetch_assoc()['total'];

					$internalData->toSearch = $rowData['Post_UserID'];
					$internalData->field = "User_ID";
					$UserInfo 		= $this->getData('Users', 'Data', 'RequestConditional', $internalData, $conn)->fetch_assoc();

					$rowData['likeCount'] = $likeCount;
					$rowData['commentCount'] = $commentCount;
					$rowData["Username"] = $UserInfo['User_Username'] ? $UserInfo['User_Username'] : "Unknown";

					array_push($payload, $rowData);
				}
				break;

			case '/Profile':
				$posts = [];
				$internalData = new stdClass();

				$User = $Validation->checkUserLogin($JWT, $conn, $Res);
				$User['posts'] = [];

				$internalData->toSearch = $User['User_ID'];
				$internalData->field = "Post_UserID";

				$post = $this->getData("Posts", "Data", "RequestConditional", $internalData, $conn);


				while ($loop = $post->fetch_assoc()) {
					$internalData->toSearch = $loop['Post_ID'];
					$internalData->field = "Like_PostID";

					$likeCount 		= $this->getData('Likes', 'Count', 'RequestConditional', $internalData, $conn)->fetch_assoc()['total'];

					$internalData->field = "Comment_PostID";
					$commentCount = $this->getData('Comments', 'Count', 'RequestConditional', $internalData, $conn)->fetch_assoc()['total'];

					$loop["commentCount"] = $commentCount;
					$loop["likeCount"] = $likeCount;

					unset($loop['Post_UserID']);
					array_push($User['posts'], $loop);
				}

				unset($User['User_ID']);
				unset($User['User_Password']);
				$payload = $User;
				break;
		}

		$Res->sendData($payload);
	}
}
