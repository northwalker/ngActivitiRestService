/**
 * Created by Northwalker on 2016/4/14.
 */
(function (window, angular, undefined) {
  'use strict';

  var urlBase = '/api';
  var authHeader = 'authorization';

  /**
   * @ngdoc overview
   * @name ngActivitiRestServices
   * @module
   * @description
   *
   * The `ngActivitiRestService` module provides services for interacting with
   * activiti engine REST API.
   *
   */
  var ngActivitiRest = angular.module('ngActivitiRestServices', ['ngResource']);
  ngActivitiRest
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('ngActivitiRequestInterceptor');
    }])
    .factory('ngActivitiRequestInterceptor', ['$q', 'ngActivitiResource',
      function ($q, ngActivitiResource) {
        return {
          'request': function (config) {
            var activitiAcct = ngActivitiResource.getActivitiAccount() ? ngActivitiResource.getActivitiAccount() : 'kermit';
            var activitiPwd = ngActivitiResource.getActivitiAccount() ? ngActivitiResource.getActivitiAccount() : 'kermit';
            config.headers[authHeader] = 'Basic ' + btoa(activitiAcct + ':' + activitiPwd);
            return config;
          }
        }
      }])
    /**
     * @ngdoc object
     * @name ngActivitiRestService.ngActivitiResourceProvider
     * @header ngActivitiRestService.ngActivitiResourceProvider
     * @description
     * Use `ngActivitiResourceProvider` to change the global configuration
     * settings used.
     *
     * ## Example
     *
     * ```js
     * angular.module('app')
     *  .config(function(ngActivitiResourceProvider) {
     *     ngActivitiResourceProvider.setAuthHeader('X-Access-Token');
     *  });
     * ```
     */
    .provider('ngActivitiResource', function ngActivitiResourceProvider() {

      /* */
      this.activitiAccount = 'kermit';     // Default account
      this.activitiPassword = 'kermit';     // Default password

      /**
       * @ngdoc method
       * @name ngActivitiRestServices.ngActivitiResourceProvider#setAuthHeader
       * @methodOf ngActivitiRestServices.ngActivitiResourceProvider
       * @param {string} header The header name to use, e.g. `X-Access-Token`
       * @description
       *
       */
      this.setAuthHeader = function (header) {
        authHeader = header;
      };

      /**
       * @ngdoc method
       * @name ngActivitiRestServices.ngActivitiResourceProvider#setUrlBase
       * @methodOf ngActivitiRestServices.ngActivitiResourceProvider
       * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
       * @description
       * Change the URL of the REST API server.
       *
       */
      this.setUrlBase = function (url) {
        urlBase = url;
      };

      /**
       * @ngdoc method
       * @name ngActivitiRestServices.ngActivitiResourceProvider#getUrlBase
       * @methodOf ngActivitiRestServices.ngActivitiResourceProvider
       * @description
       * Get the URL of the REST API server.
       *
       */
      this.getUrlBase = function () {
        return urlBase;
      };

      this.setActivitiAccount = function (account) {
        this.activitiAccount = account;
      };

      this.getActivitiAccount = function () {
        return this.activitiAccount;
      };

      this.setActivitiPassword = function (password) {
        this.activitiPassword = password;
      };

      this.getAcitivitiPassword = function () {
        return this.activitiPassword;
      };

      this.$get = ['$resource', function ($resource) {
        return this;
      }];
    })
    .factory('DeploymentService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + '/repository/deployments/:deploymentId',
        {'deploymentId': '@deploymentId'},
        {
          'listDeployments': {
            method: 'GET',
            url: urlBase + '/repository/deployments'
          },
          'getDeployment': {
            method: 'GET',
            url: urlBase + '/repository/deployments/:deploymentId'
          },
          'createNewDeployment': {
            method: 'POST',
            url: urlBase + '/repository/deployments'
          },
          'deleteDeployment': {
            method: 'DELETE',
            url: urlBase + '/repository/deployments/:deploymentId'
          },
          'listResourcesInDeployment': {
            method: 'GET',
            url: urlBase + '/repository/deployments/:deploymentId/resources'
          },
          'getDeploymentResources': {
            method: 'GET',
            params: {resourceId: '@resourceId'},
            url: urlBase + '/repository/deployments/:deploymentId/resources/:resourceId'
          },
          'getDeploymentResourcesContent': {
            method: 'GET',
            params: {resourceId: '@resourceId'},
            url: urlBase + '/repository/deployments/:deploymentId/resourcedata/:resourceId'
          }

        }
      );

      R["get"] = R["listDeployments"];
      R["getById"] = R["getDeployment"];
      R["post"] = R["createNewDeployment"];
      R["deleteById"] = R["deleteDeployment"];
      R["destroyById"] = R["deleteDeployment"];
      R["removeById"] = R["deleteDeployment"];

      return R;

    }])
    .factory('ProcessDefinitionsService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/process-definitions/:processDefinitionId",
        {'processDefinitionId': '@processDefinitionId'},
        {
          "listProcessDefinitions": {
            method: 'GET',
            url: urlBase + '/repository/process-definitions'
          },
          "getProcessDefinitions": {
            method: 'GET',
            url: urlBase + '/repository/process-definitions/:processDefinitionId'
          },
          "UpdateCategoryForProcessDefinition": {
            method: 'PUT',
            url: urlBase + '/repository/process-definitions'
          },
          "GetProcessDefinitionResourceContent": {
            method: 'GET',
            url: urlBase + "/repository/process-definitions/:processDefinitionId/resourcedata"
          },
          "GetProcessDefinitionBPMNModel": {
            method: 'GET',
            url: urlBase + "/repository/process-definitions/:processDefinitionId/model"
          },
          "suspendProcessDefinition": {
            method: 'PUT',
            url: urlBase + "/repository/process-definitions/:processDefinitionId"
          },
          "activateProcessDefinition": {
            method: 'PUT',
            url: urlBase + "/repository/process-definitions/:processDefinitionId"
          },
          "getAllCandidateStartersForProcessDefinition": {
            method: 'GET',
            url: urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks"
          },
          "addCandidateStartersToProcessDefinition": {
            method: 'POST',
            url: urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks"
          },
          "deleteCandidateStartersFromProcessDefinition": {
            method: 'DELETE',
            url: urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks"
          },
          "getCandidateStartersFromProcessDefinition": {
            method: 'GET',
            params: {family: '@family', identityId: '@identityId'},
            url: urlBase + "/repository/process-definitions/:processDefinitionId/identitylinks/:family/:identityId"
          }

        }
      );

      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];

      return R;

    }])
    .factory('ModelsService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/models/:modelId",
        {'modelId': '@modelId'},
        {}
      );

      R["destroyById"] = R["deleteById"];
      R["removeById"] = R["deleteById"];

      return R;

    }])
    .factory('ProcessInstanceService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/process-instances/:processInstanceId",
        {'processInstanceId': '@processInstanceId'},
        {
          'getProcessInstance': {
            method: 'GET',
            url: urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'deleteProcessInstance': {
            method: 'DELETE',
            url: urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'activateProcessInstance': {
            method: 'PUT',
            url: urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'startProcessInstance': {
            method: 'POST',
            url: urlBase + 'runtime/process-instances/:processInstanceId'
          },
          'listProcessInstance': {
            method: 'GET',
            url: urlBase + 'runtime/process-instances'
          },
          'queryProcessInstance': {
            method: 'POST',
            url: urlBase + 'query/process-instances'
          },
          'getDiagramForProcessInstance': {
            method: 'GET',
            url: urlBase + 'runtime/process-instances/:processInstanceId/diagram'
          },
          'getInvolvedForProcessInstance': {
            method: 'GET',
            url: urlBase + 'runtime/process-instances/:processInstanceId/identitylinks'
          },
          'addInvolvedForProcessInstance': {
            method: 'POST',
            url: urlBase + 'runtime/process-instances/:processInstanceId/identitylinks'
          },
          'removeInvolvedForProcessInstance': {
            method: 'DELETE',
            params: {userId: '@userId', type: '@type'},
            url: urlBase + 'runtime/process-instances/:processInstanceId/identitylinks/users/:userId/:type'
          },
          'listVariablesForProcessInstance': {
            method: 'GET',
            url: urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'getVariableForProcessInstance': {
            method: 'GET',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/process-instances/:processInstanceId/variables/:variableName'
          },
          'createVariablesForProcessInstance': {
            method: 'POST',
            url: urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'updateVariablesForProcessInstance': {
            method: 'PUT',
            url: urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'updateSingleVariableForProcessInstance': {
            method: 'PUT',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/process-instances/:processInstanceId/variables/:variableName'
          },
          'createBinaryVariablesOnProcessInstance': {
            method: 'POST',
            url: urlBase + 'runtime/process-instances/:processInstanceId/variables'
          },
          'updateBinaryVariablesOnProcessInstance': {
            method: 'PUT',
            url: urlBase + 'runtime/process-instances/:processInstanceId/variables'
          }
        }
      );

      return R;
    }])
    .factory('ExecutionsService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/executions/:executionId",
        {'executionId': '@executionId'},
        {
          'getExecution': {
            method: 'GET',
            url: urlBase + 'runtime/executions/:executionId'
          },
          'executeExecution': {
            method: 'PUT',
            url: urlBase + 'runtime/executions/:executionId'
          },
          'getActivesInExecution': {
            method: 'GET',
            url: urlBase + 'runtime/executions/:executionId/activities'
          },
          'listExecutions': {
            method: 'GET',
            url: urlBase + 'runtime/executions'
          },
          'queryExecutions': {
            method: 'POST',
            url: urlBase + 'runtime/executions'
          },
          'listVariablesForExecutions': {
            method: 'GET',
            url: urlBase + 'runtime/executions/:executionId/variables'
            // GET runtime/executions/:executionId/:variableName?scope=:scope
          },
          'getVariablesForExecutions': {
            method: 'GET',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/executions/:executionId/variables/:variableName'
            // GET runtime/executions/:executionId/:variableName?scope=:scope
          },
          'createVariablesOnExecutions': {
            method: 'POST',
            url: urlBase + 'runtime/executions/:executionId/variables'
          },
          'updateVariablesOnExecutions': {
            method: 'PUT',
            url: urlBase + 'runtime/executions/:executionId/variables'
          },
          'updateVariableOnExecutions': {
            method: 'PUT',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/executions/:executionId/variables/:variableName'
          },
          'createBinaryVariablesOnExecutions': {
            method: 'POST',
            url: urlBase + 'runtime/executions/:executionId/variables'
          },
          'updateBinaryVariablesOnExecutions': {
            method: 'PUt',
            url: urlBase + 'runtime/executions/:executionId/variables'
          }
        }
      );

      return R;

    }])
    .factory('TaskService', ['$resource', function ($resource) {
      var R = $resource(
        urlBase + "/repository/tasks/:taskId",
        {'taskId': '@taskId'},
        {
          'getTask': {
            method: 'GET',
            url: urlBase + 'runtime/tasks/:taskId'
          },
          'listTasks': {
            method: 'GET',
            url: urlBase + 'runtime/tasks'
          },
          'updateTask': {
            method: 'PUT',
            url: urlBase + 'runtime/tasks/:taskId'
          },
          'queryTasks': {
            method: 'POST',
            url: urlBase + 'query/tasks'
          },
          'deleteTask': {
            method: 'DELETE',
            url: urlBase + 'runtime/tasks/:taskId'
          },
          'getAllVariablesForTask': {
            method: 'DELETE',
            url: urlBase + 'runtime/tasks/:taskId/variables'
          },
          'getAllVariableFromTask': {
            method: 'DELETE',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/tasks/:taskId/variables/:variableName'
          },

          'getBinaryDataForVariable': {
            method: 'GET',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/tasks/:taskId/variables/:variableName/data'
          },
          'createVariableOnTask': {
            method: 'POST',
            url: urlBase + 'runtime/tasks/:taskId/variables'
          },
          'createBinaryDataOnTask': {
            method: 'POST',
            url: urlBase + 'runtime/tasks/:taskId/variables'
          },
          'updateVariableOnTask': {
            method: 'PUT',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/tasks/:taskId/variables/:variableName'
          },
          'updateBinaryDataOnOnTask': {
            method: 'PUT',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/tasks/:taskId/variables/:variableName'
          },
          'deleteVariableOnTask': {
            method: 'DELETE',
            params: {variableName: '@variableName'},
            url: urlBase + 'runtime/tasks/:taskId/variables/:variableName'
          },
          'deleteAllLocalVariableOnTask': {
            method: 'DELETE',
            url: urlBase + 'runtime/tasks/:taskId/variables'
          },
          'getAllIdentityLinksForTask': {
            method: 'GET',
            url: urlBase + 'runtime/tasks/:taskId/identitylinks'
          },
          'getAllIdentityLinksForTaskUsers': {
            method: 'GET',
            url: urlBase + 'runtime/tasks/:taskId/identitylinks/users'
          },
          'getAllIdentityLinksForTaskGroups': {
            method: 'GET',
            url: urlBase + 'runtime/tasks/:taskId/identitylinks/groups'
          },
          'getSingleIdentityLinksOnTask': {
            method: 'GET',
            params: {family: '@family', identityId: '@identityId', type: '@type'},
            url: urlBase + 'runtime/tasks/:taskId/identitylinks/:family/:identityId/:type'
          },
          'createCommentOnTask': {
            method: 'POST',
            url: urlBase + 'runtime/tasks/:taskId/comments'
          },
          'getAllCommentsOnTask': {
            method: 'GET',
            url: urlBase + 'runtime/tasks/:taskId/comments'
          },
          'getCommentOnTask': {
            method: 'GET',
            params: {commentId: '@commentId'},
            url: urlBase + 'runtime/tasks/:taskId/comments/:commentId'
          },
          'deleteCommentOnTask': {
            method: 'DELETE',
            params: {commentId: '@commentId'},
            url: urlBase + 'runtime/tasks/:taskId/comments/:commentId'
          },
          'getAllEventsOnTask': {
            method: 'GET',
            url: urlBase + 'runtime/tasks/:taskId/events'
          },
          'getEventOnTask': {
            method: 'GET',
            params: {eventId: '@eventId'},
            url: urlBase + 'runtime/tasks/:taskId/events/:eventId'
          },
          'createAttachmentOnTask': {
            method: 'POST',
            url: urlBase + 'runtime/tasks/:taskId/attachments'
          },
          'createAttachmentOnTaskWithAttachedFile': {
            method: 'POST',
            url: urlBase + 'runtime/tasks/:taskId/attachments'
          },
          'getAllAttachmentsOnTask': {
            method: 'GET',
            url: urlBase + 'runtime/tasks/:taskId/attachments'
          },
          'getAttachmentOnTask': {
            method: 'GET',
            params: {attachmentId: '@attachmentId'},
            url: urlBase + 'runtime/tasks/:taskId/attachments/:attachmentId'
          },
          'getContentForAttachment': {
            method: 'GET',
            params: {attachmentId: '@attachmentId'},
            url: urlBase + 'runtime/tasks/:taskId/attachments/:attachmentId/content'
          },
          'deleteAttachmentOnTask': {
            method: 'DELETE',
            params: {attachmentId: '@attachmentId'},
            url: urlBase + 'runtime/tasks/:taskId/attachments/:attachmentId'
          }
        }
      );

      return R;

    }])
    .factory('HistoryService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/history/historic-process-instances/:processInstanceId",
        {'processInstanceId': '@processInstanceId', taskId: '@taskId'},
        {
          'getHistoricProcessInstance': {
            method: 'GET',
            url: urlBase + "/history/historic-process-instances/:processInstanceId"
          },
          'listHistoricProcessInstances': {
            method: 'GET',
            url: urlBase + "/history/historic-process-instances"
          },
          'queryHistoricProcessInstances': {
            method: 'POST',
            url: urlBase + "/history/historic-process-instances"
          },
          'deleteHistoricProcessInstances': {
            method: 'DELETE',
            url: urlBase + "/history/historic-process-instances/:processInstanceId"
          },
          'getIdentitylinksOfHistoricProcessInstance': {
            method: 'GET',
            url: urlBase + "/history/historic-process-instances/:processInstanceId/identitylinks"
          },
          'getBinaryDataForHistoricProcessInstance': {
            method: 'GET',
            params: {variableName: '@variableName'},
            url: urlBase + "/history/historic-process-instances/:processInstanceId/variables/:variableName/data"
          },
          'createNewCommentOnHistoricProcessInstance': {
            method: 'POST',
            url: urlBase + "/history/historic-process-instances/:processInstanceId/comments"
          },
          'getAllCommentsOnHistoricProcessInstance': {
            method: 'GET',
            url: urlBase + "/history/historic-process-instances/:processInstanceId/comments"
          },
          'getCommentOnHistoricProcessInstance': {
            method: 'GET',
            params: {commentId: '@commentId'},
            url: urlBase + "/history/historic-process-instances/:processInstanceId/comments/:commentId"
          },
          'deleteCommentOnHistoricProcessInstance': {
            method: 'DELETE',
            params: {commentId: '@commentId'},
            url: urlBase + "/history/historic-process-instances/:processInstanceId/comments/:commentId"
          },
          'getSingleHistoricTaskInstance': {
            method: 'GET',
            param: {taskId: '@taskId'},
            url: urlBase + "/history/historic-task-instances/:taskId"
          },
          'getHistoricTaskInstances': {
            method: 'GET',
            url: urlBase + "/history/historic-task-instances"
          },
          'queryHistoricTaskInstances': {
            method: 'POST',
            url: urlBase + "/history/historic-task-instances"
          },
          'deleteSingleHistoricTaskInstance': {
            method: 'DELETE',
            param: {taskId: '@taskId'},
            url: urlBase + "/history/historic-task-instances/:taskId"
          },
          'getIdentitylinksOfHistoricTaskInstance': {
            method: 'GET',
            param: {taskId: '@taskId'},
            url: urlBase + "/history/historic-task-instances/:taskId/identitylinks"
          },
          'getBinaryDataForHistoricTaskInstance': {
            method: 'GET',
            param: {taskId: '@taskId', variableName: '@variableName'},
            url: urlBase + "/history/historic-task-instances/:taskId/variables/:variableName/data"
          },
          'getHistoricActivityInstances': {
            method: 'GET',
            url: urlBase + "/history/historic-activity-instances"
          },
          'queryHistoricActivityInstances': {
            method: 'POST',
            url: urlBase + "/history/historic-activity-instances"
          },
          'listHistoricVariableInstances': {
            method: 'GET',
            url: urlBase + "/history/historic-variable-instances"
          },
          'queryHistoricVariableInstances': {
            method: 'POST',
            url: urlBase + "/history/historic-variable-instances"
          },
          'getHistoricDetail': {
            method: 'GET',
            url: urlBase + "/history/historic-detail"
          },
          'queryHistoricDetail': {
            method: 'POST',
            url: urlBase + "/history/historic-detail"
          },
          'getBinaryDataForHistoricDetail': {
            method: 'GET',
            params: {detailId: '@detailId'},
            url: urlBase + "/history/historic-detail/:detailId/data"
          },
        }
      );

      return R;

    }])
    .factory('FormsService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/form/form-data",
        {},
        {
          'getFormData': {
            method: 'GET',
            url: urlBase + "/form/form-data"
          },
          'submitTaskFormData': {
            method: 'POST',
            url: urlBase + "/form/form-data"
          }
        }
      );

      return R;

    }])
    .factory('DatabaseTablesService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/management/tables",
        {tableName: '@tableName'},
        {
          'listOfTables': {
            method: 'GET',
            url: urlBase + "/management/tables"
          },
          'getSingleTable': {
            method: 'GET',
            params: {tableName: '@tableName'},
            url: urlBase + "/management/tables/:tableName"
          },
          'getColumnInfoForSingleTable': {
            method: 'GET',
            params: {tableName: '@tableName'},
            url: urlBase + "/management/tables/:tableName/columns"
          },
          'getRowDataForSingleTable': {
            method: 'GET',
            params: {tableName: '@tableName'},
            url: urlBase + "/management/tables/:tableName/data"
          }
        }
      );

      return R;

    }])
    .factory('EngineService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/management/engine",
        {},
        {
          'getEngineProperties': {
            method: 'GET',
            url: urlBase + "/management/properties"
          },
          'getEngineInfo': {
            method: 'GET',
            url: urlBase + "/management/engine"
          }

        }
      );

      return R;

    }])
    .factory('JobsService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/management/jobs/:jobId",
        {jobId: '@jobId'},
        {
          'getJob': {
            method: 'GET',
            url: urlBase + "/management/jobs/:jobId"
          },
          'deleteJob': {
            method: 'DELETE',
            url: urlBase + "/management/jobs/:jobId"
          },
          'getExceptionStacktraceForJob': {
            method: 'GET',
            url: urlBase + "/management/jobs/:jobId/exception-stacktrace"
          },
          'listJobs': {
            method: 'GET',
            url: urlBase + "/management/jobs"
          }
        }
      );

      return R;

    }])
    .factory('UsersService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/identity/users/:userId",
        {userId: '@userId'},
        {
          'getUser': {
            method: 'GET',
            url: urlBase + "/identity/users/:userId"
          },
          'listUsers': {
            method: 'GET',
            url: urlBase + "/identity/users"
          },
          'updateUser': {
            method: 'PUT',
            url: urlBase + "/identity/users/:userId"
          },
          'createUser': {
            method: 'POST',
            url: urlBase + "/identity/users"
          },
          'deleteUser': {
            method: 'DELETE',
            url: urlBase + "/identity/users/:userId"
          },
          'getUserPicture': {
            method: 'GET',
            url: urlBase + "/identity/users/:userId/picture"
          },
          'updateUserPicture': {
            method: 'PUT',
            /* strange method on userguid: http://activiti.org/userguide/#_updating_a_user_s_picture,
             * update from 'GET' to 'PUT' */
            url: urlBase + "/identity/users/:userId/picture"
          },
          'listUserInfo': {
            method: 'GET',
            /* strange method on userguid: http://activiti.org/userguide/#_list_a_user_s_info,
             * update from 'PUT' to 'GET' */
            url: urlBase + "/identity/users/:userId/info"
          },
          'getUserInfo': {
            method: 'GET',
            params: {key: '@key'},
            url: urlBase + "/identity/users/:userId/info/:key"
          },
          'updateUserInfo': {
            method: 'PUT',
            params: {key: '@key'},
            url: urlBase + "/identity/users/:userId/info/:key"
          },
          'createUserInfoEntry': {
            method: 'POST',
            url: urlBase + "/identity/users/:userId/info"
          },
          'deleteUserInfo': {
            method: 'DELETE',
            params: {key: '@key'},
            url: urlBase + "/identity/users/:userId/info/:key"
          }
        }
      );

      return R;

    }])
    .factory('GroupsService', ['$resource', function ($resource) {

      var R = $resource(
        urlBase + "/identity/groups/:groupId",
        {groupId: '@groupId'},
        {
          'getGroup': {
            method: 'GET',
            url: urlBase + "/identity/groups/:groupId"
          },
          'listGroup': {
            method: 'GET',
            url: urlBase + "/identity/groups"
          },
          'updateGroup': {
            method: 'PUT',
            url: urlBase + "/identity/groups/:groupId"
          },
          'createGroup': {
            method: 'POSt',
            url: urlBase + "/identity/groups"
          },
          'deleteGroup': {
            method: 'DELETE',
            url: urlBase + "/identity/groups/:groupId"
          },
          'getMemberInGroup': {
            method: 'GET',
            url: urlBase + "/identity/users"
            //GET identity/users?memberOfGroup=sales
          },
          'addMemberToGroup': {
            method: 'POST',
            url: urlBase + "/identity/groups/:groupId/members"
          },
          'deleteMemberFromGroup': {
            method: 'DELETE',
            params: {userId: '@userId'},
            url: urlBase + "/identity/groups/:groupId/members/:userId"
          }
        }
      );

      return R;

    }]);
})(window, window.angular);
