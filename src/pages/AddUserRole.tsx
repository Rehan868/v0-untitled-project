import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { fetchPermissions, createRole, assignPermissionsToRole } from '@/services/api';
import { Loader2 } from 'lucide-react';

const AddUserRole = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [permissions, setPermissions] = useState({});
  const [allPermissions, setAllPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Group permissions by category
  const permissionCategories = {};

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        setLoading(true);
        const permissionsData = await fetchPermissions();
        
        // Initialize permissions state with all permissions set to false
        const permissionsState = {};
        permissionsData.forEach(permission => {
          permissionsState[permission.name] = false;
        });
        
        setPermissions(permissionsState);
        setAllPermissions(permissionsData);
      } catch (error) {
        console.error('Error loading permissions:', error);
        toast({
          title: 'Error',
          description: 'Failed to load permissions. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPermissions();
  }, [toast]);

  // Group permissions by category once permissions are loaded
  allPermissions.forEach(permission => {
    if (!permissionCategories[permission.category]) {
      permissionCategories[permission.category] = [];
    }
    permissionCategories[permission.category].push(permission);
  });

  const handleSaveRole = async () => {
    if (!roleName.trim()) {
      toast({
        title: 'Error',
        description: 'Role name is required',
        variant: 'destructive'
      });
      return;
    }

    try {
      setSubmitting(true);
      
      // 1. Create the role
      const newRole = await createRole({
        name: roleName,
        description: roleDescription
      });
      
      // 2. Assign permissions to the role
      const selectedPermissionIds = allPermissions
        .filter(permission => permissions[permission.name])
        .map(permission => permission.id);
      
      if (selectedPermissionIds.length > 0) {
        await assignPermissionsToRole(newRole.id, selectedPermissionIds);
      }
      
      toast({
        title: 'Role Added',
        description: `The role '${roleName}' has been successfully added.`,
      });
      
      // Navigate back to settings page
      navigate('/settings');
    } catch (error) {
      console.error('Error saving role:', error);
      toast({
        title: 'Error',
        description: 'Failed to save role. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prev) => ({
      ...prev,
      [permission.name]: !prev[permission.name],
    }));
  };

  const handleCancel = () => {
    navigate('/settings');
  };

  // Format permission name for display
  const formatPermissionName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Role</h1>
        <p className="text-muted-foreground mt-1">Create a new user role with specific permissions</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Role Information</CardTitle>
          <CardDescription>
            Define the basic information for this user role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name*</Label>
              <Input
                id="role-name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Role Description</Label>
              <Input
                id="role-description"
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Enter role description"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Define what this role can access and modify in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.keys(permissionCategories).map((category) => (
            <div key={category} className="space-y-4">
              <div>
                <h3 className="text-lg font-medium capitalize">{category}</h3>
                <Separator className="my-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissionCategories[category].map((permission) => (
                  <div
                    key={permission.id}
                    className="flex items-center justify-between border rounded-md p-3"
                  >
                    <div>
                      <Label className="cursor-pointer" htmlFor={permission.name}>
                        {formatPermissionName(permission.name)}
                      </Label>
                      {permission.description && (
                        <p className="text-xs text-muted-foreground mt-1">{permission.description}</p>
                      )}
                    </div>
                    <Switch
                      id={permission.name}
                      checked={permissions[permission.name]}
                      onCheckedChange={() => handlePermissionChange(permission)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
        <div className="px-6 py-4 flex justify-end gap-4 border-t">
          <Button variant="outline" onClick={handleCancel} disabled={submitting}>Cancel</Button>
          <Button onClick={handleSaveRole} disabled={submitting} className="flex items-center gap-2">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Save Role
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AddUserRole;